import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function createDocument(collectionName, documentId, data) {
  await setDoc(doc(db, collectionName, documentId), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function addDocument(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getDocument(collectionName, documentId) {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
}

export async function getCollection(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}