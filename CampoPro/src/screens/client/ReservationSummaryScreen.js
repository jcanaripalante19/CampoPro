import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';

export default function ReservationSummaryScreen({ route, navigation }) {
  const { field, date, slot } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen</Text>
      <Text style={styles.subtitle}>Revisa los datos antes de pagar.</Text>

      <Card style={styles.card}>
        <Card.Title title={field.name} subtitle={field.sport} />
        <Card.Content>
          <Text style={styles.text}>Fecha: {date}</Text>
          <Text style={styles.text}>Hora: {slot.startTime} - {slot.endTime}</Text>
          <Text style={styles.text}>Total: {field.pricePerHour} €</Text>

          <Button
            mode="contained"
            style={styles.button}
            onPress={() =>
              navigation.navigate(routes.CLIENT_FAKE_PAYMENT, {
                field,
                date,
                slot,
              })
            }
          >
            Continuar al pago simulado
          </Button>
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
  text: {
    color: colors.textSecondary,
    marginBottom: 8,
  },
  button: {
    borderRadius: 14,
    marginTop: 16,
  },
});