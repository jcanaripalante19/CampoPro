import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminSeedDataScreen from '../screens/admin/AdminSeedDataScreen';
import AdminBusinessesScreen from '../screens/admin/AdminBusinessesScreen';
import AdminBusinessDetailScreen from '../screens/admin/AdminBusinessDetailScreen';
import AdminPlansScreen from '../screens/admin/AdminPlansScreen';
import AdminSubscriptionPaymentsScreen from '../screens/admin/AdminSubscriptionPaymentsScreen';
import AdminReportsScreen from '../screens/admin/AdminReportsScreen';
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
        name={routes.ADMIN_BUSINESSES}
        component={AdminBusinessesScreen}
        options={{ title: 'Negocios' }}
      />

      <Stack.Screen
        name={routes.ADMIN_BUSINESS_DETAIL}
        component={AdminBusinessDetailScreen}
        options={{ title: 'Detalle negocio' }}
      />

      <Stack.Screen
        name={routes.ADMIN_PLANS}
        component={AdminPlansScreen}
        options={{ title: 'Planes' }}
      />

      <Stack.Screen
        name={routes.ADMIN_SUBSCRIPTION_PAYMENTS}
        component={AdminSubscriptionPaymentsScreen}
        options={{ title: 'Pagos' }}
      />

      <Stack.Screen
        name={routes.ADMIN_REPORTS}
        component={AdminReportsScreen}
        options={{ title: 'Reportes' }}
      />

      <Stack.Screen
        name={routes.ADMIN_SEED_DATA}
        component={AdminSeedDataScreen}
        options={{ title: 'Datos iniciales' }}
      />
    </Stack.Navigator>
  );
}