import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA7D7fOekYqLk54kgDc3Jb5i2JIk_YR-2A",
  authDomain: "handia.firebaseapp.com",
  projectId: "handia",
  storageBucket: "handia.firebasestorage.app",
  messagingSenderId: "470473562206",
  appId: "1:470473562206:web:2f594748da1783069f7ccf",
  measurementId: "G-KKFLR4BLFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;