import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, Button, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import {
  getOwnerReservations,
  updateReservationStatus,
} from '../../services/ownerService';

export default function OwnerReservationsScreen() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadReservations = async () => {
    setLoading(true);

    try {
      const result = await getOwnerReservations();
      setReservations(result);
    } catch (error) {
      console.log('Error reservas dueño:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservationId) => {
    await updateReservationStatus(reservationId, 'cancelled');
    await loadReservations();
  };

  useFocusEffect(
    useCallback(() => {
      loadReservations();
    }, [])
  );

  const renderReservation = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.fieldName || item.fieldId}
        subtitle={`${item.date} · ${item.startTime} - ${item.endTime}`}
      />
      <Card.Content>
        <Text style={styles.text}>Cliente: {item.clientName || item.clientEmail}</Text>
        <Text style={styles.text}>Estado: {item.status}</Text>
        <Text style={styles.text}>Pago: {item.paymentStatus}</Text>
        <Text style={styles.text}>Total: {item.total} €</Text>

        {item.status !== 'cancelled' && (
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => handleCancel(item.id)}
          >
            Cancelar reserva
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas del negocio</Text>
      <Text style={styles.subtitle}>
        Consulta las reservas asociadas al negocio demo.
      </Text>

      <Button mode="outlined" style={styles.button} onPress={loadReservations}>
        Actualizar
      </Button>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id}
          renderItem={renderReservation}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay reservas registradas.</Text>
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
    marginTop: 10,
    marginBottom: 12,
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