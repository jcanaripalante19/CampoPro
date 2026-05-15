import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import routes from '../../constants/routes';
import { logoutUser } from '../../services/authService';
import { clearAuth } from '../../redux/slices/authSlice';
import { clearProfile } from '../../redux/slices/profileSlice';

export default function ProfileSettingsScreen({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const activeRole = useSelector((state) => state.profile.activeRole);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(clearAuth());
    dispatch(clearProfile());

    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const handleChangeProfile = () => {
    navigation.navigate(routes.PROFILE_SELECTOR);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Gestiona tu sesión y perfil activo.</Text>

      <Card style={styles.card}>
        <Card.Title
          title={user?.name || 'Usuario CampoPro'}
          subtitle={`Perfil activo: ${activeRole}`}
        />
      </Card>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={handleChangeProfile}
      >
        Cambiar perfil
      </Button>

      <Button
        mode="contained"
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        Cerrar sesión
      </Button>
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 20,
  },
  button: {
    borderRadius: 14,
    marginBottom: 12,
  },
  logoutButton: {
    borderRadius: 14,
    backgroundColor: colors.danger,
  },
});