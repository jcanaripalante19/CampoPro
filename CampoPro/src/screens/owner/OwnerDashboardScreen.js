import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import colors from '../../constants/colors';

export default function OwnerDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel dueño</Text>
      <Text style={styles.subtitle}>
        Gestiona tu negocio, campos, empleados y reservas.
      </Text>

      <Card style={styles.card}>
        <Card.Title
          title="Resumen del negocio"
          subtitle="Aquí se mostrarán reservas de hoy, campos activos y reportes."
        />
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
});