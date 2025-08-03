import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBy_SW66GyuLZwqs0DX4jPaKUHsGHTqjHE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "newbrain-7955f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "newbrain-7955f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "newbrain-7955f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "331779110246",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:331779110246:web:190d973de808b847ee44a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Enable offline persistence
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Plusieurs onglets ouverts, la persistance ne peut être activée que dans un seul onglet à la fois.');
    } else if (err.code === 'unimplemented') {
      console.warn('Le navigateur actuel ne prend pas en charge la persistance.');
    }
  });
} catch (err) {
  console.warn('Erreur lors de l\'activation de la persistance:', err);
}

export default app;