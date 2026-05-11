import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import colors from '../../constants/colors';

export default function ClientHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio cliente</Text>
      <Text style={styles.subtitle}>
        Busca campos deportivos y realiza reservas.
      </Text>

      <Card style={styles.card}>
        <Card.Title
          title="Buscar campos"
          subtitle="Próximamente se listarán campos disponibles desde Firebase."
        />
        <Card.Content>
          <Button mode="contained" style={styles.button}>
            Buscar campo
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
  button: {
    borderRadius: 14,
    marginTop: 12,
  },
});