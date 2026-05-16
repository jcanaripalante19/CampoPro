export function getPlanLimitText(plan) {
  if (!plan) {
    return 'Sin plan asignado';
  }

  const venues = plan.maxVenues === null ? 'Ilimitadas' : plan.maxVenues;
  const fields = plan.maxFields === null ? 'Ilimitados' : plan.maxFields;
  const employees = plan.maxEmployees === null ? 'Ilimitados' : plan.maxEmployees;

  return `Sedes: ${venues} · Campos: ${fields} · Empleados: ${employees}`;
}

export function isLimitReached(currentValue, maxValue) {
  if (maxValue === null || maxValue === undefined) {
    return false;
  }

  return currentValue >= maxValue;
}

export function getPlanNameById(plans, planId) {
  const plan = plans.find((item) => item.id === planId);
  return plan?.name || 'Plan no encontrado';
}