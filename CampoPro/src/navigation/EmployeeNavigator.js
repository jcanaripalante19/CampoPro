import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeDashboardScreen from '../screens/employee/EmployeeDashboardScreen';
import colors from '../constants/colors';
import routes from '../constants/routes';

const Stack = createNativeStackNavigator();

export default function EmployeeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen
        name={routes.EMPLOYEE_DASHBOARD}
        component={EmployeeDashboardScreen}
        options={{ title: 'Empleado' }}
      />
    </Stack.Navigator>
  );
}