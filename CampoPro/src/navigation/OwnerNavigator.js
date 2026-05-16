import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OwnerDashboardScreen from '../screens/owner/OwnerDashboardScreen';
import OwnerReservationsScreen from '../screens/owner/OwnerReservationsScreen';
import OwnerFieldsScreen from '../screens/owner/OwnerFieldsScreen';
import OwnerEmployeesScreen from '../screens/owner/OwnerEmployeesScreen';
import OwnerMaintenanceScreen from '../screens/owner/OwnerMaintenanceScreen';
import OwnerVenuesScreen from '../screens/owner/OwnerVenuesScreen';
import OwnerPlanScreen from '../screens/owner/OwnerPlanScreen';
import colors from '../constants/colors';
import routes from '../constants/routes';

const Stack = createNativeStackNavigator();

export default function OwnerNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen
        name={routes.OWNER_DASHBOARD}
        component={OwnerDashboardScreen}
        options={{ title: 'Dueño' }}
      />

      <Stack.Screen
        name={routes.OWNER_RESERVATIONS}
        component={OwnerReservationsScreen}
        options={{ title: 'Reservas' }}
      />
      <Stack.Screen
        name={routes.OWNER_PLAN}
        component={OwnerPlanScreen}
        options={{ title: 'Mi Plan' }}
      />
      <Stack.Screen
        name={routes.OWNER_VENUES}
        component={OwnerVenuesScreen}
        options={{ title: 'Sedes' }}
      />
      <Stack.Screen
        name={routes.OWNER_FIELDS}
        component={OwnerFieldsScreen}
        options={{ title: 'Campos' }}
      />

      <Stack.Screen
        name={routes.OWNER_EMPLOYEES}
        component={OwnerEmployeesScreen}
        options={{ title: 'Empleados' }}
      />

      <Stack.Screen
        name={routes.OWNER_MAINTENANCE}
        component={OwnerMaintenanceScreen}
        options={{ title: 'Mantenimiento' }}
      />
    </Stack.Navigator>
  );
}