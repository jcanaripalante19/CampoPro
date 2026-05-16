import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, ActivityIndicator, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import { getClientReservations } from '../../services/reservationService';

export default function MyReservationsScreen() {
  const user = useSelector((state) => state.auth.user);

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadReservations = async () => {
    setLoading(true);

    try {
      const result = await getClientReservations(user.uid);
      setReservations(result);
    } catch (error) {
      console.log('Error cargando mis reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadReservations();
    }, [])
  );

  const renderReservation = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.fieldName}
        subtitle={`${item.date} · ${item.startTime} - ${item.endTime}`}
      />
      <Card.Content>
        <Text style={styles.text}>Estado: {item.status}</Text>
        <Text style={styles.text}>Pago: {item.paymentStatus}</Text>
        <Text style={styles.text}>Total: {item.total} €</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis reservas</Text>
      <Text style={styles.subtitle}>
        Aquí se muestran tus reservas realizadas.
      </Text>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={loadReservations}
      >
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
            <Text style={styles.empty}>Todavía no tienes reservas.</Text>
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
  button: {
    borderRadius: 14,
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
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 30,
  },
  loading: {
    marginTop: 30,
  },
});