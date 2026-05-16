import {
  collection,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function getAdminBusinesses() {
  const querySnapshot = await getDocs(collection(db, 'businesses'));

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function getAdminPlans() {
  const querySnapshot = await getDocs(collection(db, 'plans'));

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function getSubscriptionPayments() {
  const querySnapshot = await getDocs(collection(db, 'payments_subscriptions'));

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function updateBusinessPlan(businessId, planId) {
  const businessRef = doc(db, 'businesses', businessId);

  await updateDoc(businessRef, {
    planId,
    updatedAt: serverTimestamp(),
  });
}

export async function updateBusinessStatus(businessId, status) {
  const businessRef = doc(db, 'businesses', businessId);

  await updateDoc(businessRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function getAdminReportData() {
  const businessesSnapshot = await getDocs(collection(db, 'businesses'));
  const reservationsSnapshot = await getDocs(collection(db, 'reservations'));
  const paymentsSnapshot = await getDocs(collection(db, 'payments_reservations'));
  const fieldsSnapshot = await getDocs(collection(db, 'fields'));

  const businesses = businessesSnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  const reservations = reservationsSnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  const payments = paymentsSnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  const fields = fieldsSnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  const totalReservations = reservations.length;

  const cancelledReservations = reservations.filter(
    (reservation) => reservation.status === 'cancelled'
  ).length;

  const totalIncome = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  const activeBusinesses = businesses.filter(
    (business) => business.status === 'active'
  ).length;

  const fieldCounter = {};

  reservations.forEach((reservation) => {
    if (!reservation.fieldId) {
      return;
    }

    fieldCounter[reservation.fieldId] = (fieldCounter[reservation.fieldId] || 0) + 1;
  });

  let mostReservedFieldId = null;
  let mostReservedCount = 0;

  Object.keys(fieldCounter).forEach((fieldId) => {
    if (fieldCounter[fieldId] > mostReservedCount) {
      mostReservedFieldId = fieldId;
      mostReservedCount = fieldCounter[fieldId];
    }
  });

  const mostReservedField = fields.find((field) => field.id === mostReservedFieldId);

  return {
    totalReservations,
    cancelledReservations,
    totalIncome,
    activeBusinesses,
    mostReservedFieldName: mostReservedField?.name || 'Sin datos',
    mostReservedCount,
  };
}