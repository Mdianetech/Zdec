import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBy_SW66GyuLZwqs0DX4jPaKUHsGHTqjHE",
  authDomain: "newbrain-7955f.firebaseapp.com",
  projectId: "newbrain-7955f",
  storageBucket: "newbrain-7955f.firebasestorage.app",
  messagingSenderId: "331779110246",
  appId: "1:331779110246:web:190d973de808b847ee44a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Configuration pour la production
console.log('🔥 Firebase configuré pour le projet:', firebaseConfig.projectId);

export default app;