import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ClientNavigator from './ClientNavigator';
import OwnerNavigator from './OwnerNavigator';
import EmployeeNavigator from './EmployeeNavigator';
import AdminNavigator from './AdminNavigator';
import colors from '../constants/colors';
import roles from '../constants/roles';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator({ route }) {
  const role = route?.params?.role || roles.CLIENT;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 82,
          paddingBottom: 24,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse-outline';

          if (route.name === 'Cliente') iconName = 'search-outline';
          if (route.name === 'Dueño') iconName = 'business-outline';
          if (route.name === 'Empleado') iconName = 'calendar-outline';
          if (route.name === 'Admin') iconName = 'settings-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {role === roles.CLIENT && (
        <Tab.Screen name="Cliente" component={ClientNavigator} />
      )}

      {role === roles.OWNER && (
        <Tab.Screen name="Dueño" component={OwnerNavigator} />
      )}

      {role === roles.EMPLOYEE && (
        <Tab.Screen name="Empleado" component={EmployeeNavigator} />
      )}

      {role === roles.ADMIN && (
        <Tab.Screen name="Admin" component={AdminNavigator} />
      )}
    </Tab.Navigator>
  );
}