import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../../constants/colors';
import { createInitialCollections } from '../../data/initialCollections';

export default function FirebaseTestScreen() {
  const [message, setMessage] = useState('Firebase pendiente de prueba');

  const handleCreateCollections = async () => {
    try {
      setMessage('Creando colecciones iniciales...');
      await createInitialCollections();
      setMessage('Colecciones iniciales creadas correctamente');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba Firebase</Text>
      <Text style={styles.message}>{message}</Text>

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleCreateCollections}
      >
        Crear colecciones iniciales
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    borderRadius: 14,
  },
});