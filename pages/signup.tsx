import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/clientApp';
import { setDoc, doc, collection, getDocs } from 'firebase/firestore';
import { neighborhoodConverter } from '@/types/Neighborhood';
import Account, { accountConverter } from '@/types/Account';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // "success" or "error"

  // function to get the user's current location
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => reject(error)
        );
      } else {
        reject(new Error('Geolocation not supported'));
      }
    });
  };

  // function to handle sign up and store location
  const handleSignUp = async (e: Event) => {
    e.preventDefault();
    try {
      // create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // get the user's location
      const location = await getLocation();
      let castLocation = location as {latitude: number, longitude: number};

      // find neighborhood closest
      let neighborhood = await FindNeighborhood(castLocation);

      // create user
      let user = new Account(userCredential.user.uid, name, castLocation, neighborhood.id, neighborhood.name, 0);

      // store the user in Firestore with location details
      await setDoc(doc(db, 'users', user.UUID).withConverter(accountConverter), user);

      // reset fields
      setEmail('');
      setName('');
      setPassword('');

      setMessage('User signed up successfully!');
      setMessageType('success');
      
    } catch (error: any) {
      setMessage('Error during sign up: ' + error.message);
      setMessageType('error');
    }
  };

  // algorithm to find closest neighborhood to user
  const FindNeighborhood = async (location: {latitude: number, longitude: number}) => {
    // init variables
    let neighborhoods:any[] = [];
    // get collection
    const neighborhoodCol = collection(db, "neighborhoods").withConverter(neighborhoodConverter);
    // get data
    const snapshot = await getDocs(neighborhoodCol);
    // populate array
    snapshot.forEach((doc) => {
        neighborhoods.push({ ...doc.data(), id: doc.id })
    })

    const distanceSquared = (a: [any, any], b: [any, any]) => {
        return Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2);
    }

    // algorithm to find nearest neighborhood
    let closestIndex = 0;
    for (let i = 1; i < neighborhoods.length; i++) {
        if (distanceSquared([location.latitude, location.longitude], 
          [neighborhoods[i].location.latitude, neighborhoods[i].location.longitude]) < 
            distanceSquared([location.latitude, location.longitude], 
            [neighborhoods[closestIndex].location.latitude, neighborhoods[closestIndex].location.longitude])) {
                closestIndex = i;
            }
    }

    return {id: neighborhoods[closestIndex].id, name: neighborhoods[closestIndex].name};
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignUp} style={styles.form}>
        <h2 style={styles.heading}>Sign Up</h2>
        {message && (
          <p style={messageType === 'error' ? styles.error : styles.success}>
            {message}
          </p>
        )}
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    color: '#000000',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#F9F9F9',
    color: '#000000',
    outline: 'none',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#E5E4E2',
    color: '#000000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  success: {
    color: 'green',
    marginBottom: '1rem',
  },
};

export default SignUp;
