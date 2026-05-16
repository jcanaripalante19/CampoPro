import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientHomeScreen from '../screens/client/ClientHomeScreen';
import SearchFieldsScreen from '../screens/client/SearchFieldsScreen';
import FieldDetailScreen from '../screens/client/FieldDetailScreen';
import SelectDateTimeScreen from '../screens/client/SelectDateTimeScreen';
import ReservationSummaryScreen from '../screens/client/ReservationSummaryScreen';
import FakePaymentScreen from '../screens/client/FakePaymentScreen';
import ReservationSuccessScreen from '../screens/client/ReservationSuccessScreen';
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
        name={routes.CLIENT_SEARCH_FIELDS}
        component={SearchFieldsScreen}
        options={{ title: 'Buscar campos' }}
      />

      <Stack.Screen
        name={routes.CLIENT_FIELD_DETAIL}
        component={FieldDetailScreen}
        options={{ title: 'Detalle del campo' }}
      />

      <Stack.Screen
        name={routes.CLIENT_SELECT_DATETIME}
        component={SelectDateTimeScreen}
        options={{ title: 'Fecha y hora' }}
      />

      <Stack.Screen
        name={routes.CLIENT_RESERVATION_SUMMARY}
        component={ReservationSummaryScreen}
        options={{ title: 'Resumen de reserva' }}
      />

      <Stack.Screen
        name={routes.CLIENT_FAKE_PAYMENT}
        component={FakePaymentScreen}
        options={{ title: 'Pago simulado' }}
      />

      <Stack.Screen
        name={routes.CLIENT_RESERVATION_SUCCESS}
        component={ReservationSuccessScreen}
        options={{ title: 'Confirmación' }}
      />

      <Stack.Screen
        name={routes.CLIENT_RESERVATIONS}
        component={MyReservationsScreen}
        options={{ title: 'Mis reservas' }}
      />
    </Stack.Navigator>
  );
}