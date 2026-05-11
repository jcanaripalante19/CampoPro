import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import colors from '../../constants/colors';

export default function AdminDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel administrador</Text>
      <Text style={styles.subtitle}>
        Control general de negocios, planes y usuarios de CampoPro.
      </Text>

      <Card style={styles.card}>
        <Card.Title
          title="Gestión SaaS"
          subtitle="Aquí se mostrarán negocios registrados, planes y pagos simulados."
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