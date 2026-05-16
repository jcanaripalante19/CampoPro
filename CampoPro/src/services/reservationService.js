import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { buildReservationCode, buildPaymentCode } from '../utils/reservationUtils';

export async function getActiveFields() {
  const querySnapshot = await getDocs(collection(db, 'fields'));

  return querySnapshot.docs
    .map((item) => ({
      id: item.id,
      ...item.data(),
    }))
    .filter((field) => field.active);
}

export async function getReservationsByFieldAndDate(fieldId, date) {
  const q = query(
    collection(db, 'reservations'),
    where('fieldId', '==', fieldId),
    where('date', '==', date)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function getMaintenancesByFieldAndDate(fieldId, date) {
  const q = query(
    collection(db, 'maintenances'),
    where('fieldId', '==', fieldId),
    where('date', '==', date)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function createReservationWithPayment({
  user,
  field,
  date,
  slot,
  paymentMethod,
}) {
  const reservationCode = buildReservationCode();
  const paymentCode = buildPaymentCode();

  const reservationData = {
    code: reservationCode,
    businessId: field.businessId,
    venueId: field.venueId,
    fieldId: field.id,
    fieldName: field.name,
    clientId: user.uid,
    clientName: user.name,
    clientEmail: user.email,
    date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod,
    total: field.pricePerHour,
    createdAt: serverTimestamp(),
  };

  const reservationRef = await addDoc(
    collection(db, 'reservations'),
    reservationData
  );

  const paymentData = {
    code: paymentCode,
    reservationId: reservationRef.id,
    businessId: field.businessId,
    clientId: user.uid,
    amount: field.pricePerHour,
    method: paymentMethod,
    status: 'paid',
    operationCode: paymentCode,
    createdAt: serverTimestamp(),
  };

  await addDoc(collection(db, 'payments_reservations'), paymentData);

  return {
    reservationId: reservationRef.id,
    reservationCode,
    paymentCode,
  };
}

export async function getClientReservations(clientId) {
  const q = query(
    collection(db, 'reservations'),
    where('clientId', '==', clientId)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}