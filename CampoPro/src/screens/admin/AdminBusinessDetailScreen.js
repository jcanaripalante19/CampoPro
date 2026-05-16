import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, Chip } from 'react-native-paper';
import colors from '../../constants/colors';
import {
  getAdminPlans,
  updateBusinessPlan,
  updateBusinessStatus,
} from '../../services/adminService';
import { getPlanNameById } from '../../utils/planUtils';

export default function AdminBusinessDetailScreen({ route }) {
  const { business } = route.params;

  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(business.planId);
  const [status, setStatus] = useState(business.status);
  const [message, setMessage] = useState('');

  const loadPlans = async () => {
    const result = await getAdminPlans();
    setPlans(result);
  };

  const handleUpdatePlan = async (planId) => {
    await updateBusinessPlan(business.id, planId);
    setSelectedPlanId(planId);
    setMessage('Plan actualizado correctamente.');
  };

  const handleUpdateStatus = async (newStatus) => {
    await updateBusinessStatus(business.id, newStatus);
    setStatus(newStatus);
    setMessage('Estado actualizado correctamente.');
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{business.name}</Text>
      <Text style={styles.subtitle}>Detalle del negocio registrado.</Text>

      <Card style={styles.card}>
        <Card.Title
          title="Información"
          subtitle={`Plan actual: ${getPlanNameById(plans, selectedPlanId)}`}
        />

        <Card.Content>
          <Text style={styles.text}>ID: {business.id}</Text>
          <Text style={styles.text}>Dueño: {business.ownerId}</Text>
          <Text style={styles.text}>Estado: {status}</Text>
          <Text style={styles.text}>Ciudad: {business.city}</Text>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Asignar plan</Text>

      <View style={styles.chipRow}>
        {plans.map((plan) => (
          <Chip
            key={plan.id}
            selected={selectedPlanId === plan.id}
            onPress={() => handleUpdatePlan(plan.id)}
            style={styles.chip}
          >
            {plan.name}
          </Chip>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Cambiar estado</Text>

      <Button
        mode={status === 'active' ? 'contained' : 'outlined'}
        style={styles.button}
        onPress={() => handleUpdateStatus('active')}
      >
        Activar negocio
      </Button>

      <Button
        mode={status === 'suspended' ? 'contained' : 'outlined'}
        style={styles.button}
        onPress={() => handleUpdateStatus('suspended')}
      >
        Suspender negocio
      </Button>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 16,
  },
  text: {
    color: colors.textSecondary,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  button: {
    borderRadius: 14,
    marginBottom: 10,
  },
  message: {
    color: colors.primary,
    marginTop: 8,
  },
});