import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Card, TextInput, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import {
  getOwnerEmployees,
  linkEmployeeByEmail,
} from '../../services/ownerService';

export default function OwnerEmployeesScreen() {
  const [employees, setEmployees] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {
    setLoading(true);

    try {
      const result = await getOwnerEmployees();
      setEmployees(result);
    } catch (error) {
      console.log('Error empleados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkEmployee = async () => {
    if (!email) {
      setMessage('Introduce el correo del empleado.');
      return;
    }

    await linkEmployeeByEmail(email);
    setEmail('');
    setMessage('Empleado vinculado correctamente.');
    await loadEmployees();
  };

  useFocusEffect(
    useCallback(() => {
      loadEmployees();
    }, [])
  );

  const renderEmployee = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.email}
        subtitle={item.active ? 'Empleado activo' : 'Empleado inactivo'}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empleados</Text>
      <Text style={styles.subtitle}>
        Vincula empleados al negocio mediante correo.
      </Text>

      <Card style={styles.formCard}>
        <Card.Title title="Vincular empleado" subtitle="Correo del usuario" />
        <Card.Content>
          <TextInput
            label="Correo"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <Button
            mode="contained"
            style={styles.button}
            onPress={handleLinkEmployee}
          >
            Vincular empleado
          </Button>
        </Card.Content>
      </Card>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          renderItem={renderEmployee}
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
  message: {
    color: colors.primary,
    marginBottom: 8,
  },
  loading: {
    marginTop: 30,
  },
});