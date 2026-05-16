import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';

export default function OwnerDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel dueño</Text>
      <Text style={styles.subtitle}>
        Gestiona tu negocio, campos, empleados y reservas.
      </Text>

      <Card style={styles.card}>
        <Card.Title
          title="Reservas"
          subtitle="Consulta y cancela reservas del negocio."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.OWNER_RESERVATIONS)}
          >
            Ver reservas
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Campos"
          subtitle="Consulta y crea campos deportivos."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.OWNER_FIELDS)}
          >
            Gestionar campos
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Empleados"
          subtitle="Vincula empleados por correo."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.OWNER_EMPLOYEES)}
          >
            Gestionar empleados
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Mantenimiento"
          subtitle="Bloquea horarios no disponibles."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.OWNER_MAINTENANCE)}
          >
            Crear mantenimiento
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