import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Card, TextInput, ActivityIndicator } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';
import {
  getAvailableSlots,
} from '../../utils/reservationUtils';
import {
  getReservationsByFieldAndDate,
  getMaintenancesByFieldAndDate,
} from '../../services/reservationService';

export default function SelectDateTimeScreen({ route, navigation }) {
  const { field } = route.params;

  const [date, setDate] = useState('2026-05-22');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLoadAvailability = async () => {
    setLoading(true);

    try {
      const reservations = await getReservationsByFieldAndDate(field.id, date);
      const maintenances = await getMaintenancesByFieldAndDate(field.id, date);

      const availableSlots = getAvailableSlots({
        fieldId: field.id,
        date,
        reservations,
        maintenances,
      });

      setSlots(availableSlots);
    } catch (error) {
      console.log('Error disponibilidad:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSlot = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={`${item.startTime} - ${item.endTime}`}
        subtitle={item.reason}
      />
      <Card.Content>
        <Button
          mode={item.available ? 'contained' : 'outlined'}
          disabled={!item.available}
          style={styles.button}
          onPress={() =>
            navigation.navigate(routes.CLIENT_RESERVATION_SUMMARY, {
              field,
              date,
              slot: item,
            })
          }
        >
          {item.available ? 'Seleccionar' : 'No disponible'}
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fecha y hora</Text>
      <Text style={styles.subtitle}>{field.name}</Text>

      <TextInput
        label="Fecha"
        mode="outlined"
        value={date}
        onChangeText={setDate}
        style={styles.input}
        placeholder="YYYY-MM-DD"
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleLoadAvailability}
      >
        Consultar disponibilidad
      </Button>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={slots}
          keyExtractor={(item) => item.startTime}
          renderItem={renderSlot}
          style={styles.list}
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
  input: {
    marginBottom: 14,
    backgroundColor: colors.card,
  },
  button: {
    borderRadius: 14,
  },
  list: {
    marginTop: 18,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 12,
  },
  loading: {
    marginTop: 30,
  },
});