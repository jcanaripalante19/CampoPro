import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';

export default function EmployeeDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel empleado</Text>
      <Text style={styles.subtitle}>
        Gestiona reservas del día y pagos en local.
      </Text>

      <Card style={styles.card}>
        <Card.Title
          title="Reservas"
          subtitle="Ver reservas operativas y marcar pagos."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.EMPLOYEE_RESERVATIONS)}
          >
            Ver reservas
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Reserva manual"
          subtitle="Crear una reserva desde atención local."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.EMPLOYEE_MANUAL_RESERVATION)}
          >
            Crear reserva manual
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
    marginBottom: 14,
  },
  button: {
    borderRadius: 14,
    marginTop: 8,
  },
});