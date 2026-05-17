import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCtWa-HqASCO17Ncy4mShuqWLMPPN4b3wA',
  authDomain: 'campopro-bfd00.firebaseapp.com',
  projectId: 'campopro-bfd00',
  storageBucket: 'campopro-bfd00.firebasestorage.app',
  messagingSenderId: '743273275632',
  appId: '1:743273275632:web:1aaa0b23766423a8716235',
};

const app = initializeApp(firebaseConfig);

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { app, auth, db };