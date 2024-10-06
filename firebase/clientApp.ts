import { getApps, getApp, initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// init app
const app = !getApps().length ? initializeApp(clientCredentials) : getApp();

// init auth
const auth = getAuth(app);

// init database
const db = getFirestore();

export { app, auth, db };