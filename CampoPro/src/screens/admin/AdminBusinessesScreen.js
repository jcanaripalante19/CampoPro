import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, ActivityIndicator, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import routes from '../../constants/routes';
import { getAdminBusinesses } from '../../services/adminService';

export default function AdminBusinessesScreen({ navigation }) {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBusinesses = async () => {
    setLoading(true);

    try {
      const result = await getAdminBusinesses();
      setBusinesses(result);
    } catch (error) {
      console.log('Error negocios admin:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBusinesses();
    }, [])
  );

  const renderBusiness = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={`Ciudad: ${item.city || 'Sin ciudad'} · Estado: ${item.status}`}
      />

      <Card.Content>
        <Text style={styles.text}>Plan: {item.planId}</Text>
        <Text style={styles.text}>Dueño: {item.ownerId}</Text>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() =>
            navigation.navigate(routes.ADMIN_BUSINESS_DETAIL, {
              business: item,
            })
          }
        >
          Ver detalle
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Negocios</Text>
      <Text style={styles.subtitle}>
        Consulta los negocios registrados en CampoPro.
      </Text>

      <Button mode="outlined" style={styles.button} onPress={loadBusinesses}>
        Actualizar
      </Button>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={businesses}
          keyExtractor={(item) => item.id}
          renderItem={renderBusiness}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay negocios registrados.</Text>
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
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 14,
  },
  text: {
    color: colors.textSecondary,
    marginBottom: 6,
  },
  button: {
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 12,
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