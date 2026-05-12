import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import FirebaseTestScreen from '../screens/shared/FirebaseTestScreen';
import routes from '../constants/routes';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
        />
        <Stack.Screen
          name={routes.MAIN_TABS}
          component={MainTabNavigator}
        />
        <Stack.Screen
          name="FirebaseTest"
          component={FirebaseTestScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}