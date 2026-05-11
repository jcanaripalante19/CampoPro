import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProfileSelectorScreen from '../screens/auth/ProfileSelectorScreen';
import colors from '../constants/colors';
import routes from '../constants/routes';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={routes.SPLASH}
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen
        name={routes.SPLASH}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        options={{ title: 'Registro' }}
      />
      <Stack.Screen
        name={routes.PROFILE_SELECTOR}
        component={ProfileSelectorScreen}
        options={{ title: 'Seleccionar perfil' }}
      />
    </Stack.Navigator>
  );
}