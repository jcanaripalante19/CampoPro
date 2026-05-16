import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, ActivityIndicator, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import { getSubscriptionPayments } from '../../services/adminService';

export default function AdminSubscriptionPaymentsScreen() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPayments = async () => {
    setLoading(true);

    try {
      const result = await getSubscriptionPayments();
      setPayments(result);
    } catch (error) {
      console.log('Error pagos suscripción:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPayments();
    }, [])
  );

  const renderPayment = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={`${item.amount} € · ${item.month}`}
        subtitle={`Negocio: ${item.businessId}`}
      />
      <Card.Content>
        <Text style={styles.text}>Plan: {item.planId}</Text>
        <Text style={styles.text}>Estado: {item.status}</Text>
        <Text style={styles.text}>Método: {item.method}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagos de suscripción</Text>
      <Text style={styles.subtitle}>
        Pagos simulados de planes contratados por negocios.
      </Text>

      <Button mode="outlined" style={styles.button} onPress={loadPayments}>
        Actualizar
      </Button>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={payments}
          keyExtractor={(item) => item.id}
          renderItem={renderPayment}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay pagos registrados.</Text>
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