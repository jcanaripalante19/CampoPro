import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, ActivityIndicator, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import { getAdminPlans } from '../../services/adminService';
import { getPlanLimitText } from '../../utils/planUtils';

export default function AdminPlansScreen() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPlans = async () => {
    setLoading(true);

    try {
      const result = await getAdminPlans();
      setPlans(result);
    } catch (error) {
      console.log('Error planes:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPlans();
    }, [])
  );

  const renderPlan = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={`${item.name} · ${item.price} €/mes`}
        subtitle={getPlanLimitText(item)}
      />
      <Card.Content>
        <Text style={styles.text}>Reportes: {item.reports}</Text>
        <Text style={styles.text}>
          Mantenimiento: {item.maintenance ? 'Incluido' : 'No incluido'}
        </Text>
        <Text style={styles.text}>Soporte: {item.support}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planes</Text>
      <Text style={styles.subtitle}>
        Planes disponibles para los negocios deportivos.
      </Text>

      <Button mode="outlined" style={styles.button} onPress={loadPlans}>
        Actualizar
      </Button>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={plans}
          keyExtractor={(item) => item.id}
          renderItem={renderPlan}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay planes registrados.</Text>
          }
        />
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
  text: {
    color: colors.textSecondary,
    marginBottom: 6,
  },
  button: {
    borderRadius: 14,
    marginBottom: 14,
  },
  loading: {
    marginTop: 30,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 30,
  },
});