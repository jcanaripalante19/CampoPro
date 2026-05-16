import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import roles from '../constants/roles';

const DEMO_BUSINESS_ID = 'demo-business';
const DEMO_VENUE_ID = 'demo-venue-central';

export async function getOwnerVenues() {
  const q = query(
    collection(db, 'venues'),
    where('businessId', '==', DEMO_BUSINESS_ID)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function getOwnerEmployees() {
  const q = query(
    collection(db, 'employees'),
    where('businessId', '==', DEMO_BUSINESS_ID)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function createOwnerField({ name, sport, capacity, pricePerHour }) {
  const fieldData = {
    businessId: DEMO_BUSINESS_ID,
    venueId: DEMO_VENUE_ID,
    name,
    sport,
    capacity: Number(capacity),
    pricePerHour: Number(pricePerHour),
    active: true,
    createdAt: serverTimestamp(),
  };

  const fieldRef = await addDoc(collection(db, 'fields'), fieldData);

  return fieldRef.id;
}

export async function linkEmployeeByEmail(email) {
  const employeeData = {
    businessId: DEMO_BUSINESS_ID,
    userId: null,
    email: email.trim().toLowerCase(),
    role: roles.EMPLOYEE,
    active: true,
    createdAt: serverTimestamp(),
  };

  const employeeRef = await addDoc(collection(db, 'employees'), employeeData);

  return employeeRef.id;
}

export async function createMaintenanceBlock({
  fieldId,
  date,
  startTime,
  endTime,
  reason,
}) {
  const maintenanceData = {
    businessId: DEMO_BUSINESS_ID,
    venueId: DEMO_VENUE_ID,
    fieldId,
    date,
    startTime,
    endTime,
    reason,
    status: 'active',
    createdAt: serverTimestamp(),
  };

  const maintenanceRef = await addDoc(
    collection(db, 'maintenances'),
    maintenanceData
  );

  return maintenanceRef.id;
}

export async function updateReservationStatus(reservationId, status) {
  const reservationRef = doc(db, 'reservations', reservationId);

  await updateDoc(reservationRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function markReservationLocalPaid(reservationId) {
  const reservationRef = doc(db, 'reservations', reservationId);

  await updateDoc(reservationRef, {
    paymentStatus: 'paid',
    paymentMethod: 'local',
    updatedAt: serverTimestamp(),
  });
}