import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Card, TextInput, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import {
  createMaintenanceBlock,
  getOwnerFields,
} from '../../services/ownerService';

export default function OwnerMaintenanceScreen() {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState('');
  const [date, setDate] = useState('2026-05-22');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadFields = async () => {
    setLoading(true);

    try {
      const result = await getOwnerFields();
      setFields(result);
      if (result.length > 0 && !selectedFieldId) {
        setSelectedFieldId(result[0].id);
      }
    } catch (error) {
      console.log('Error campos mantenimiento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMaintenance = async () => {
    if (!selectedFieldId || !date || !startTime || !endTime || !reason) {
      setMessage('Completa todos los datos del mantenimiento.');
      return;
    }

    await createMaintenanceBlock({
      fieldId: selectedFieldId,
      date,
      startTime,
      endTime,
      reason,
    });

    setReason('');
    setMessage('Bloqueo de mantenimiento creado correctamente.');
  };

  useFocusEffect(
    useCallback(() => {
      loadFields();
    }, [])
  );

  const renderField = ({ item }) => (
    <Card
      style={[
        styles.card,
        selectedFieldId === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedFieldId(item.id)}
    >
      <Card.Title
        title={item.name}
        subtitle={`${item.sport} · ${item.pricePerHour} €/hora`}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mantenimiento</Text>
      <Text style={styles.subtitle}>
        Bloquea horarios para que no puedan reservarse.
      </Text>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={fields}
          keyExtractor={(item) => item.id}
          renderItem={renderField}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.fieldList}
        />
      )}

      <Card style={styles.formCard}>
        <Card.Title title="Nuevo bloqueo" subtitle="Datos del mantenimiento" />
        <Card.Content>
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
          <TextInput
            label="Motivo"
            mode="outlined"
            value={reason}
            onChangeText={setReason}
            style={styles.input}
          />

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <Button
            mode="contained"
            style={styles.button}
            onPress={handleCreateMaintenance}
          >
            Crear bloqueo
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
  card: {
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