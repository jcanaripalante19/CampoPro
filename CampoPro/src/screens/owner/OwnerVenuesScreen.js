import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, ActivityIndicator, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import { getOwnerVenues } from '../../services/ownerService';

export default function OwnerVenuesScreen() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadVenues = async () => {
    setLoading(true);

    try {
      const result = await getOwnerVenues();
      setVenues(result);
    } catch (error) {
      console.log('Error sedes dueño:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadVenues();
    }, [])
  );

  const renderVenue = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={`${item.city} · ${item.address}`}
      />
      <Card.Content>
        <Text style={styles.text}>
          Horario: {item.openingTime} - {item.closingTime}
        </Text>
        <Text style={styles.text}>
          Estado: {item.active ? 'Activa' : 'Inactiva'}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sedes</Text>
      <Text style={styles.subtitle}>
        Consulta las sedes asociadas al negocio.
      </Text>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={loadVenues}
      >
        Actualizar
      </Button>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={venues}
          keyExtractor={(item) => item.id}
          renderItem={renderVenue}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay sedes registradas.</Text>
          }
        />
      )}
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
    marginBottom: 14,
  },
  button: {
    borderRadius: 14,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 14,
  },
  text: {
    color: colors.textSecondary,
    marginBottom: 6,
  },
  loading: {
    marginTop: 30,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 30,
  },
});