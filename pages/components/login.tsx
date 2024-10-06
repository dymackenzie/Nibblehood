'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';

import Neighborhood from '@/types/Neighborhood';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/clientApp';
import { neighborhoodConverter } from '@/types/Neighborhood';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // "success" or "error"
  const router = useRouter();

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    setMessage(''); // Reset message
    setMessageType('');

    try {
      // Firebase login with email and password
      await signInWithEmailAndPassword(auth, email, password);
      setMessageType('success');
      setMessage('Login successful!');
      router.push('/');
    } catch (error: any) {
      setMessageType('error');
      setMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Log In</h2>
        {message && (
          <p style={messageType === 'error' ? styles.error : styles.success}>
            {message}
          </p>
        )}
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
          Log In
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    backgroundColor: '#1f1f1f',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    color: '#fff',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#333',
    color: '#fff',
    outline: 'none',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#6200ee',
    color: '#fff',
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

export default LogIn;
