import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput, ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import colors from '../../constants/colors';
import routes from '../../constants/routes';
import { loginUser } from '../../services/authService';
import { getUserProfile } from '../../services/userService';
import { setAuthUser, setAuthLoading, setAuthError } from '../../redux/slices/authSlice';
import { setAvailableRoles, setActiveRole } from '../../redux/slices/profileSlice';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [screenError, setScreenError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setScreenError('');

      if (!email || !password) {
        setScreenError('Completa correo y contraseña.');
        return;
      }

      setLoading(true);
      dispatch(setAuthLoading(true));

      const firebaseUser = await loginUser({ email, password });
      const userProfile = await getUserProfile(firebaseUser.uid);

      if (!userProfile) {
        throw new Error('No se encontró el perfil del usuario en Firestore.');
      }

      dispatch(setAuthUser(userProfile));
      dispatch(setAvailableRoles(userProfile.roles || []));
      dispatch(setActiveRole((userProfile.roles || [])[0]));

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
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text style={styles.subtitle}>Accede a CampoPro con tu cuenta.</Text>

      <TextInput
        label="Correo electrónico"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
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
          onPress={handleLogin}
        >
          Entrar
        </Button>
      )}

      <Button
        mode="text"
        onPress={() => navigation.navigate(routes.REGISTER)}
      >
        Crear cuenta
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