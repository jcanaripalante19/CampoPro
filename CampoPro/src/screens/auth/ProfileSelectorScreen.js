import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import routes from '../../constants/routes';
import roles from '../../constants/roles';
import { setActiveRole } from '../../redux/slices/profileSlice';
import { saveActiveRole } from '../../services/localStorageService';

export default function ProfileSelectorScreen({ navigation }) {
  const dispatch = useDispatch();

  const availableRoles = useSelector((state) => state.profile.availableRoles);
  const user = useSelector((state) => state.auth.user);

  const goToProfile = async (role) => {
    await saveActiveRole(role);
    dispatch(setActiveRole(role));
    navigation.replace(routes.MAIN_TABS, { role });
  };

  const hasRole = (role) => availableRoles.includes(role);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu perfil</Text>
      <Text style={styles.subtitle}>
        Usuario: {user?.name || user?.email || 'Sin usuario'}
      </Text>

      {hasRole(roles.CLIENT) && (
        <Card style={styles.card} onPress={() => goToProfile(roles.CLIENT)}>
          <Card.Title
            title="Cliente"
            subtitle="Buscar y reservar campos deportivos"
          />
        </Card>
      )}

      {hasRole(roles.OWNER) && (
        <Card style={styles.card} onPress={() => goToProfile(roles.OWNER)}>
          <Card.Title
            title="Dueño"
            subtitle="Gestionar mi negocio deportivo"
          />
        </Card>
      )}

      {hasRole(roles.EMPLOYEE) && (
        <Card style={styles.card} onPress={() => goToProfile(roles.EMPLOYEE)}>
          <Card.Title
            title="Empleado"
            subtitle="Gestionar reservas operativas"
          />
        </Card>
      )}

      {hasRole(roles.ADMIN) && (
        <Card style={styles.card} onPress={() => goToProfile(roles.ADMIN)}>
          <Card.Title
            title="Administrador"
            subtitle="Control general de CampoPro"
          />
        </Card>
      )}

      <Card style={styles.card} onPress={() => navigation.navigate('FirebaseTest')}>
        <Card.Title
          title="Prueba Firebase"
          subtitle="Crear colecciones iniciales en Firestore"
        />
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
    marginTop: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    marginBottom: 14,
    borderRadius: 18,
  },
});