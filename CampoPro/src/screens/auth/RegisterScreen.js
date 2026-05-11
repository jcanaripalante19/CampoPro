import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>
        Todos los usuarios comienzan como clientes.
      </Text>

      <TextInput
        label="Nombre"
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Correo electrónico"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Contraseña"
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate(routes.PROFILE_SELECTOR)}
      >
        Registrarme
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
      >
        Ya tengo cuenta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 28,
  },
  input: {
    marginBottom: 14,
    backgroundColor: colors.card,
  },
  button: {
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 4,
  },
});