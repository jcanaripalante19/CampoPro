import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ActivityIndicator, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import { getAdminBusinesses, getAdminPlans } from '../../services/adminService';
import { getOwnerEmployees, getOwnerFields, getOwnerVenues } from '../../services/ownerService';
import { getPlanLimitText, isLimitReached } from '../../utils/planUtils';

export default function OwnerPlanScreen() {
  const [business, setBusiness] = useState(null);
  const [plan, setPlan] = useState(null);
  const [venuesCount, setVenuesCount] = useState(0);
  const [fieldsCount, setFieldsCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadPlanInfo = async () => {
    setLoading(true);

    try {
      const businesses = await getAdminBusinesses();
      const plans = await getAdminPlans();
      const venues = await getOwnerVenues();
      const fields = await getOwnerFields();
      const employees = await getOwnerEmployees();

      const demoBusiness = businesses.find((item) => item.id === 'demo-business');
      const currentPlan = plans.find((item) => item.id === demoBusiness?.planId);

      setBusiness(demoBusiness);
      setPlan(currentPlan);
      setVenuesCount(venues.length);
      setFieldsCount(fields.length);
      setEmployeesCount(employees.length);
    } catch (error) {
      console.log('Error mi plan:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPlanInfo();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Plan</Text>
      <Text style={styles.subtitle}>
        Consulta el plan activo y sus límites.
      </Text>

      <Button mode="outlined" style={styles.button} onPress={loadPlanInfo}>
        Actualizar
      </Button>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <>
          <Card style={styles.card}>
            <Card.Title
              title={plan?.name || 'Sin plan'}
              subtitle={business?.name || 'Negocio demo'}
            />
            <Card.Content>
              <Text style={styles.text}>{getPlanLimitText(plan)}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Uso actual" subtitle="Validación de límites" />
            <Card.Content>
              <Text style={styles.text}>
                Sedes: {venuesCount} {isLimitReached(venuesCount, plan?.maxVenues) ? '· Límite alcanzado' : ''}
              </Text>
              <Text style={styles.text}>
                Campos: {fieldsCount} {isLimitReached(fieldsCount, plan?.maxFields) ? '· Límite alcanzado' : ''}
              </Text>
              <Text style={styles.text}>
                Empleados: {employeesCount} {isLimitReached(employeesCount, plan?.maxEmployees) ? '· Límite alcanzado' : ''}
              </Text>
            </Card.Content>
          </Card>
        </>
      )}
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
    marginBottom: 14,
  },
  button: {
    borderRadius: 14,
    marginBottom: 14,
  },
  text: {
    color: colors.textSecondary,
    marginBottom: 6,
  },
  loading: {
    marginTop: 30,
  },
});