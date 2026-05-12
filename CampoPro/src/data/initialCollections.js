import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export async function createInitialCollections() {
  await setDoc(doc(db, 'plans', 'basic'), {
    id: 'basic',
    name: 'Plan Básico',
    price: 29,
    maxVenues: 1,
    maxFields: 1,
    maxEmployees: 2,
    reports: 'simple',
    maintenance: false,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'plans', 'pro'), {
    id: 'pro',
    name: 'Plan Pro',
    price: 59,
    maxVenues: 2,
    maxFields: 4,
    maxEmployees: 10,
    reports: 'advanced',
    maintenance: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'plans', 'premium'), {
    id: 'premium',
    name: 'Plan Premium',
    price: 99,
    maxVenues: null,
    maxFields: null,
    maxEmployees: null,
    reports: 'complete',
    maintenance: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'businesses', 'demo-business'), {
    id: 'demo-business',
    name: 'Canchas Demo CampoPro',
    ownerId: 'demo-owner',
    planId: 'pro',
    status: 'active',
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'fields', 'demo-field-football'), {
    id: 'demo-field-football',
    businessId: 'demo-business',
    name: 'Campo Fútbol 7',
    sport: 'Fútbol',
    pricePerHour: 35,
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'reservations', 'demo-reservation'), {
    id: 'demo-reservation',
    businessId: 'demo-business',
    fieldId: 'demo-field-football',
    clientId: 'demo-client',
    date: '2026-05-22',
    startTime: '20:00',
    endTime: '21:00',
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'simulated_card',
    total: 35,
    createdAt: serverTimestamp(),
  });
}