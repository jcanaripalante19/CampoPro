import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';

export default function FieldDetailScreen({ route, navigation }) {
  const { field } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{field.name}</Text>
      <Text style={styles.subtitle}>{field.sport}</Text>

      <Card style={styles.card}>
        <Card.Title
          title={`${field.pricePerHour} €/hora`}
          subtitle={`Capacidad: ${field.capacity} personas`}
        />
        <Card.Content>
          <Text style={styles.text}>Estado: disponible</Text>
          <Text style={styles.text}>Campo listo para reservar.</Text>

          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(routes.CLIENT_SELECT_DATETIME, { field })}
          >
            Seleccionar fecha y hora
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
    fontSize: 16,
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