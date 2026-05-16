import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

function normalizeFirestoreData(data) {
  return {
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : null,
  };
}

export async function getUserProfile(uid) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return {
    id: userSnap.id,
    ...normalizeFirestoreData(userSnap.data()),
  };
}

export async function updateUserRoles(uid, roles) {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    roles,
  });
}