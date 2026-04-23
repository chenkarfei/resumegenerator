import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC0HaRzpq2sCcG1X9slzdyUzkIPyFIYccg",
  authDomain: "resumegenerator-bdff0.firebaseapp.com",
  projectId: "resumegenerator-bdff0",
  storageBucket: "resumegenerator-bdff0.firebasestorage.app",
  messagingSenderId: "959525238299",
  appId: "1:959525238299:web:ece26417c0fc59b7fbaabe",
  measurementId: "G-2GBRMSERJW"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

if (typeof window !== 'undefined') {
  testConnection();
}

export { app, auth, db };
