import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';

export default function AdminDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel administrador</Text>
      <Text style={styles.subtitle}>
        Control general de negocios, planes y usuarios de CampoPro.
      </Text>

      <Card style={styles.card}>
        <Card.Title
          title="Negocios"
          subtitle="Ver negocios registrados y cambiar estado o plan."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.ADMIN_BUSINESSES)}
          >
            Ver negocios
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Planes"
          subtitle="Consultar planes Básico, Pro y Premium."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.ADMIN_PLANS)}
          >
            Ver planes
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Pagos de suscripción"
          subtitle="Consultar pagos simulados de planes."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.ADMIN_SUBSCRIPTION_PAYMENTS)}
          >
            Ver pagos
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Reportes"
          subtitle="Indicadores básicos de reservas e ingresos."
        />
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.ADMIN_REPORTS)}
          >
            Ver reportes
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Datos iniciales"
          subtitle="Crear datos demo para la presentación."
        />
        <Card.Content>
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => navigation.navigate(routes.ADMIN_SEED_DATA)}
          >
            Ir a datos iniciales
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