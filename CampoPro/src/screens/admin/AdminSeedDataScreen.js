import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import colors from '../../constants/colors';
import { seedDemoData } from '../../data/seedDemoData';

export default function AdminSeedDataScreen() {
  const [message, setMessage] = useState('Datos demo pendientes de crear.');
  const [loading, setLoading] = useState(false);

  const handleSeedData = async () => {
    try {
      setLoading(true);
      setMessage('Creando datos demo en Firestore...');

      await seedDemoData();

      setMessage('Datos demo creados correctamente en Firestore.');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos iniciales</Text>
      <Text style={styles.subtitle}>
        Esta pantalla permite crear datos demo para la presentación.
      </Text>

      <Card style={styles.card}>
        <Card.Title
          title="Carga de datos demo"
          subtitle={message}
        />

        <Card.Content>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSeedData}
            >
              Crear datos demo
            </Button>
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
});