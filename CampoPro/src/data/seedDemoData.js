import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import roles from '../constants/roles';

export async function seedDemoData() {
  await setDoc(doc(db, 'plans', 'basic'), {
    id: 'basic',
    name: 'Plan Básico',
    price: 29,
    maxVenues: 1,
    maxFields: 1,
    maxEmployees: 2,
    reports: 'simple',
    maintenance: false,
    support: 'standard',
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
    support: 'standard',
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
    support: 'priority',
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'users', 'demo-admin'), {
    uid: 'demo-admin',
    name: 'Administrador Demo',
    email: 'admin@campopro.demo',
    roles: [roles.ADMIN],
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'users', 'demo-owner'), {
    uid: 'demo-owner',
    name: 'Dueño Demo',
    email: 'dueno@campopro.demo',
    roles: [roles.CLIENT, roles.OWNER],
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'users', 'demo-employee'), {
    uid: 'demo-employee',
    name: 'Empleado Demo',
    email: 'empleado@campopro.demo',
    roles: [roles.CLIENT, roles.EMPLOYEE],
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'users', 'demo-client'), {
    uid: 'demo-client',
    name: 'Cliente Demo',
    email: 'cliente@campopro.demo',
    roles: [roles.CLIENT],
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'businesses', 'demo-business'), {
    id: 'demo-business',
    name: 'Canchas Demo CampoPro',
    ownerId: 'demo-owner',
    planId: 'pro',
    status: 'active',
    phone: '+34 600 000 000',
    city: 'Pamplona',
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'venues', 'demo-venue-central'), {
    id: 'demo-venue-central',
    businessId: 'demo-business',
    name: 'Sede Central Pamplona',
    address: 'Av. Demo 123',
    city: 'Pamplona',
    openingTime: '09:00',
    closingTime: '23:00',
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'fields', 'demo-field-football'), {
    id: 'demo-field-football',
    businessId: 'demo-business',
    venueId: 'demo-venue-central',
    name: 'Campo Fútbol 7',
    sport: 'Fútbol',
    capacity: 14,
    pricePerHour: 35,
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'fields', 'demo-field-padel'), {
    id: 'demo-field-padel',
    businessId: 'demo-business',
    venueId: 'demo-venue-central',
    name: 'Pista Pádel 1',
    sport: 'Pádel',
    capacity: 4,
    pricePerHour: 24,
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'fields', 'demo-field-basket'), {
    id: 'demo-field-basket',
    businessId: 'demo-business',
    venueId: 'demo-venue-central',
    name: 'Cancha Baloncesto',
    sport: 'Baloncesto',
    capacity: 10,
    pricePerHour: 30,
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'employees', 'demo-employee-link'), {
    id: 'demo-employee-link',
    businessId: 'demo-business',
    userId: 'demo-employee',
    email: 'empleado@campopro.demo',
    role: roles.EMPLOYEE,
    active: true,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'reservations', 'demo-reservation-1'), {
    id: 'demo-reservation-1',
    businessId: 'demo-business',
    venueId: 'demo-venue-central',
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

  await setDoc(doc(db, 'reservations', 'demo-reservation-2'), {
    id: 'demo-reservation-2',
    businessId: 'demo-business',
    venueId: 'demo-venue-central',
    fieldId: 'demo-field-padel',
    clientId: 'demo-client',
    date: '2026-05-22',
    startTime: '18:00',
    endTime: '19:00',
    status: 'confirmed',
    paymentStatus: 'local_payment',
    paymentMethod: 'local',
    total: 24,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'payments_reservations', 'demo-payment-1'), {
    id: 'demo-payment-1',
    reservationId: 'demo-reservation-1',
    businessId: 'demo-business',
    clientId: 'demo-client',
    amount: 35,
    method: 'simulated_card',
    status: 'paid',
    operationCode: 'PAY-SIM-0001',
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'payments_subscriptions', 'demo-subscription-payment-1'), {
    id: 'demo-subscription-payment-1',
    businessId: 'demo-business',
    ownerId: 'demo-owner',
    planId: 'pro',
    amount: 59,
    method: 'simulated_subscription',
    status: 'paid',
    month: '2026-05',
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'maintenances', 'demo-maintenance-1'), {
    id: 'demo-maintenance-1',
    businessId: 'demo-business',
    venueId: 'demo-venue-central',
    fieldId: 'demo-field-basket',
    date: '2026-05-22',
    startTime: '10:00',
    endTime: '12:00',
    reason: 'Revisión del suelo de la cancha',
    status: 'active',
    createdAt: serverTimestamp(),
  });
}