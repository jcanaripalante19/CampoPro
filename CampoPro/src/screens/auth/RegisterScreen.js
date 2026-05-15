import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput, ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import colors from '../../constants/colors';
import routes from '../../constants/routes';
import { registerUser } from '../../services/authService';
import { setAuthUser, setAuthLoading, setAuthError } from '../../redux/slices/authSlice';
import { setAvailableRoles, setActiveRole } from '../../redux/slices/profileSlice';
import roles from '../../constants/roles';

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [screenError, setScreenError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setScreenError('');

      if (!name || !email || !password) {
        setScreenError('Completa nombre, correo y contraseña.');
        return;
      }

      if (password.length < 6) {
        setScreenError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      setLoading(true);
      dispatch(setAuthLoading(true));

      const newUser = await registerUser({ name, email, password });

      dispatch(setAuthUser(newUser));
      dispatch(setAvailableRoles([roles.CLIENT]));
      dispatch(setActiveRole(roles.CLIENT));

      navigation.navigate(routes.PROFILE_SELECTOR);
    } catch (error) {
      setScreenError(error.message);
      dispatch(setAuthError(error.message));
    } finally {
      setLoading(false);
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>
        Todos los usuarios comienzan como clientes.
      </Text>

      <TextInput
        label="Nombre"
        mode="outlined"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="Correo electrónico"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Contraseña"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {screenError ? (
        <Text style={styles.error}>{screenError}</Text>
      ) : null}

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleRegister}
        >
          Registrarme
        </Button>
      )}

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
      >
        Ya tengo cuenta
      </Button>
    </KeyboardAvoidingView>
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
  error: {
    color: colors.danger,
    marginBottom: 12,
  },
  loading: {
    marginVertical: 18,
  },
});