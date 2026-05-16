import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Card, ActivityIndicator, Chip } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';
import { getActiveFields } from '../../services/reservationService';

export default function SearchFieldsScreen({ navigation }) {
  const [fields, setFields] = useState([]);
  const [selectedSport, setSelectedSport] = useState('Todos');
  const [loading, setLoading] = useState(false);

  const loadFields = async () => {
    setLoading(true);

    try {
      const result = await getActiveFields();
      setFields(result);
    } catch (error) {
      console.log('Error cargando campos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  const sports = ['Todos', ...new Set(fields.map((field) => field.sport))];

  const filteredFields =
    selectedSport === 'Todos'
      ? fields
      : fields.filter((field) => field.sport === selectedSport);

  const renderField = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate(routes.CLIENT_FIELD_DETAIL, { field: item })}
    >
      <Card.Title
        title={item.name}
        subtitle={`${item.sport} · ${item.pricePerHour} €/hora`}
      />
      <Card.Content>
        <Text style={styles.text}>Capacidad: {item.capacity} personas</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar campos</Text>
      <Text style={styles.subtitle}>Filtra por deporte y selecciona un campo.</Text>

      <FlatList
        horizontal
        data={sports}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.chips}
        renderItem={({ item }) => (
          <Chip
            selected={selectedSport === item}
            onPress={() => setSelectedSport(item)}
            style={styles.chip}
          >
            {item}
          </Chip>
        )}
      />

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={filteredFields}
          keyExtractor={(item) => item.id}
          renderItem={renderField}
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
    marginBottom: 16,
  },
  chips: {
    maxHeight: 46,
    marginBottom: 10,
  },
  chip: {
    marginRight: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 14,
  },
  text: {
    color: colors.textSecondary,
  },
  loading: {
    marginTop: 30,
  },
});