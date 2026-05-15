import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import roles from '../constants/roles';

export async function registerUser({ name, email, password }) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  const user = userCredential.user;

  const userData = {
    uid: user.uid,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    roles: [roles.CLIENT],
    active: true,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'users', user.uid), userData);

  return {
    uid: user.uid,
    email: user.email,
    name: userData.name,
    roles: userData.roles,
  };
}

export async function loginUser({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}