import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Card, TextInput, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import {
  createOwnerField,
  getOwnerFields,
} from '../../services/ownerService';

export default function OwnerFieldsScreen() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [capacity, setCapacity] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [message, setMessage] = useState('');

  const loadFields = async () => {
    setLoading(true);

    try {
      const result = await getOwnerFields();
      setFields(result);
    } catch (error) {
      console.log('Error campos dueño:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateField = async () => {
    if (!name || !sport || !capacity || !pricePerHour) {
      setMessage('Completa todos los campos.');
      return;
    }

    await createOwnerField({
      name,
      sport,
      capacity,
      pricePerHour,
    });

    setName('');
    setSport('');
    setCapacity('');
    setPricePerHour('');
    setMessage('Campo creado correctamente.');
    await loadFields();
  };

  useFocusEffect(
    useCallback(() => {
      loadFields();
    }, [])
  );

  const renderField = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={`${item.sport} · ${item.pricePerHour} €/hora`}
      />
      <Card.Content>
        <Text style={styles.text}>Capacidad: {item.capacity}</Text>
        <Text style={styles.text}>Activo: {item.active ? 'Sí' : 'No'}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campos</Text>
      <Text style={styles.subtitle}>Lista y creación básica de campos.</Text>

      <Card style={styles.formCard}>
        <Card.Title title="Nuevo campo" subtitle="Formulario simple" />
        <Card.Content>
          <TextInput
            label="Nombre"
            mode="outlined"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Deporte"
            mode="outlined"
            value={sport}
            onChangeText={setSport}
            style={styles.input}
          />
          <TextInput
            label="Capacidad"
            mode="outlined"
            value={capacity}
            onChangeText={setCapacity}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Precio por hora"
            mode="outlined"
            value={pricePerHour}
            onChangeText={setPricePerHour}
            keyboardType="numeric"
            style={styles.input}
          />

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <Button
            mode="contained"
            style={styles.button}
            onPress={handleCreateField}
          >
            Crear campo
          </Button>
        </Card.Content>
      </Card>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={fields}
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
    marginBottom: 14,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 14,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 10,
  },
  button: {
    borderRadius: 14,
    marginTop: 8,
  },
  text: {
    color: colors.textSecondary,
    marginBottom: 6,
  },
  message: {
    color: colors.primary,
    marginBottom: 8,
  },
  loading: {
    marginTop: 30,
  },
});