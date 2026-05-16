export const DEFAULT_TIME_SLOTS = [
  { startTime: '09:00', endTime: '10:00' },
  { startTime: '10:00', endTime: '11:00' },
  { startTime: '11:00', endTime: '12:00' },
  { startTime: '12:00', endTime: '13:00' },
  { startTime: '13:00', endTime: '14:00' },
  { startTime: '16:00', endTime: '17:00' },
  { startTime: '17:00', endTime: '18:00' },
  { startTime: '18:00', endTime: '19:00' },
  { startTime: '19:00', endTime: '20:00' },
  { startTime: '20:00', endTime: '21:00' },
  { startTime: '21:00', endTime: '22:00' },
];

export function isSlotReserved({ reservations, fieldId, date, startTime }) {
  return reservations.some(
    (reservation) =>
      reservation.fieldId === fieldId &&
      reservation.date === date &&
      reservation.startTime === startTime &&
      reservation.status !== 'cancelled'
  );
}

export function isSlotInMaintenance({ maintenances, fieldId, date, startTime }) {
  return maintenances.some(
    (maintenance) =>
      maintenance.fieldId === fieldId &&
      maintenance.date === date &&
      maintenance.startTime <= startTime &&
      maintenance.endTime > startTime &&
      maintenance.status === 'active'
  );
}

export function getAvailableSlots({
  fieldId,
  date,
  reservations,
  maintenances,
}) {
  return DEFAULT_TIME_SLOTS.map((slot) => {
    const reserved = isSlotReserved({
      reservations,
      fieldId,
      date,
      startTime: slot.startTime,
    });

    const maintenance = isSlotInMaintenance({
      maintenances,
      fieldId,
      date,
      startTime: slot.startTime,
    });

    return {
      ...slot,
      available: !reserved && !maintenance,
      reason: reserved ? 'Reservado' : maintenance ? 'Mantenimiento' : 'Disponible',
    };
  });
}

export function buildReservationCode() {
  return `RES-${Date.now()}`;
}

export function buildPaymentCode() {
  return `PAY-SIM-${Date.now()}`;
}