import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtWa-HqASCO17Ncy4mShuqWLMPPN4b3wA",
  authDomain: "campopro-bfd00.firebaseapp.com",
  projectId: "campopro-bfd00",
  storageBucket: "campopro-bfd00.firebasestorage.app",
  messagingSenderId: "743273275632",
  appId: "1:743273275632:web:1aaa0b23766423a8716235",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };