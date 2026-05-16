import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminSeedDataScreen from '../screens/admin/AdminSeedDataScreen';
import colors from '../constants/colors';
import routes from '../constants/routes';

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen
        name={routes.ADMIN_DASHBOARD}
        component={AdminDashboardScreen}
        options={{ title: 'Administrador' }}
      />

      <Stack.Screen
        name={routes.ADMIN_SEED_DATA}
        component={AdminSeedDataScreen}
        options={{ title: 'Datos iniciales' }}
      />
    </Stack.Navigator>
  );
}