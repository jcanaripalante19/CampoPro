import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import routes from '../../constants/routes';
import { createReservationWithPayment } from '../../services/reservationService';

export default function FakePaymentScreen({ route, navigation }) {
  const { field, date, slot } = route.params;
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async (paymentMethod) => {
    try {
      setError('');
      setLoading(true);

      const result = await createReservationWithPayment({
        user,
        field,
        date,
        slot,
        paymentMethod,
      });

      navigation.replace(routes.CLIENT_RESERVATION_SUCCESS, {
        result,
        field,
        date,
        slot,
      });
    } catch (paymentError) {
      setError(paymentError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pago simulado</Text>
      <Text style={styles.subtitle}>No se realizará ningún cobro real.</Text>

      <Card style={styles.card}>
        <Card.Title
          title={`${field.pricePerHour} €`}
          subtitle={`${field.name} · ${date} · ${slot.startTime}`}
        />

        <Card.Content>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => handlePayment('simulated_card')}
              >
                Pagar con tarjeta ficticia
              </Button>

              <Button
                mode="outlined"
                style={styles.button}
                onPress={() => handlePayment('local')}
              >
                Pago en local
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
  },
  button: {
    borderRadius: 14,
    marginTop: 12,
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
  },
});