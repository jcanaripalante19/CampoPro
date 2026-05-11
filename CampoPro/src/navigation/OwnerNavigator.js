import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OwnerDashboardScreen from '../screens/owner/OwnerDashboardScreen';
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
    </Stack.Navigator>
  );
}