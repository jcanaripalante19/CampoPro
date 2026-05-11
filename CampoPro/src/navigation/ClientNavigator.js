import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientHomeScreen from '../screens/client/ClientHomeScreen';
import MyReservationsScreen from '../screens/client/MyReservationsScreen';
import colors from '../constants/colors';
import routes from '../constants/routes';

const Stack = createNativeStackNavigator();

export default function ClientNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen
        name={routes.CLIENT_HOME}
        component={ClientHomeScreen}
        options={{ title: 'Cliente' }}
      />
      <Stack.Screen
        name={routes.CLIENT_RESERVATIONS}
        component={MyReservationsScreen}
        options={{ title: 'Mis reservas' }}
      />
    </Stack.Navigator>
  );
}