import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text style={styles.subtitle}>Accede a CampoPro con tu cuenta.</Text>

      <TextInput
        label="Correo electrónico"
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
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
        Entrar
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate(routes.REGISTER)}
      >
        Crear cuenta
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