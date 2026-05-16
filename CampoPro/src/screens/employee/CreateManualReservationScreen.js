import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Card, TextInput, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import { getOwnerFields } from '../../services/ownerService';
import { createReservationWithPayment } from '../../services/reservationService';

export default function CreateManualReservationScreen() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [clientName, setClientName] = useState('Cliente local');
  const [clientEmail, setClientEmail] = useState('cliente.local@campopro.demo');
  const [date, setDate] = useState('2026-05-22');
  const [startTime, setStartTime] = useState('22:00');
  const [endTime, setEndTime] = useState('23:00');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadFields = async () => {
    setLoading(true);

    try {
      const result = await getOwnerFields();
      setFields(result);
      if (result.length > 0 && !selectedField) {
        setSelectedField(result[0]);
      }
    } catch (error) {
      console.log('Error campos reserva manual:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateManualReservation = async () => {
    if (!selectedField || !clientName || !clientEmail || !date || !startTime || !endTime) {
      setMessage('Completa todos los datos.');
      return;
    }

    await createReservationWithPayment({
      user: {
        uid: 'manual-client',
        name: clientName,
        email: clientEmail,
      },
      field: selectedField,
      date,
      slot: {
        startTime,
        endTime,
      },
      paymentMethod: 'local',
    });

    setMessage('Reserva manual creada correctamente.');
  };

  useFocusEffect(
    useCallback(() => {
      loadFields();
    }, [])
  );

  const renderField = ({ item }) => (
    <Card
      style={[
        styles.fieldCard,
        selectedField?.id === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedField(item)}
    >
      <Card.Title
        title={item.name}
        subtitle={`${item.sport} · ${item.pricePerHour} €/hora`}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva manual</Text>
      <Text style={styles.subtitle}>
        Crea una reserva local desde el perfil empleado.
      </Text>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          horizontal
          data={fields}
          keyExtractor={(item) => item.id}
          renderItem={renderField}
          style={styles.fieldList}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <Card style={styles.formCard}>
        <Card.Title title="Datos de reserva" subtitle="Pago en local" />
        <Card.Content>
          <TextInput
            label="Cliente"
            mode="outlined"
            value={clientName}
            onChangeText={setClientName}
            style={styles.input}
          />
          <TextInput
            label="Correo cliente"
            mode="outlined"
            value={clientEmail}
            onChangeText={setClientEmail}
            style={styles.input}
          />
          <TextInput
            label="Fecha"
            mode="outlined"
            value={date}
            onChangeText={setDate}
            style={styles.input}
          />
          <TextInput
            label="Hora inicio"
            mode="outlined"
            value={startTime}
            onChangeText={setStartTime}
            style={styles.input}
          />
          <TextInput
            label="Hora fin"
            mode="outlined"
            value={endTime}
            onChangeText={setEndTime}
            style={styles.input}
          />

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <Button
            mode="contained"
            style={styles.button}
            onPress={handleCreateManualReservation}
          >
            Crear reserva manual
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
    marginBottom: 14,
  },
  fieldList: {
    maxHeight: 100,
    marginBottom: 14,
  },
  fieldCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginRight: 12,
    width: 220,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 10,
  },
  button: {
    borderRadius: 14,
    marginTop: 8,
  },
  message: {
    color: colors.primary,
    marginBottom: 8,
  },
  loading: {
    marginTop: 30,
  },
});