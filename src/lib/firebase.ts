import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBy_SW66GyuLZwqs0DX4jPaKUHsGHTqjHE",
  authDomain: "newbrain-7955f.firebaseapp.com",
  projectId: "newbrain-7955f",
  storageBucket: "newbrain-7955f.firebasestorage.app",
  messagingSenderId: "331779110246",
  appId: "1:331779110246:web:f1a0ea176e2f716fee44a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;