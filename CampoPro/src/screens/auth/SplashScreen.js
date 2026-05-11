import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../../constants/colors';
import routes from '../../constants/routes';

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CampoPro</Text>
      <Text style={styles.subtitle}>
        Gestiona campos deportivos, reservas y clientes desde una sola app.
      </Text>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.replace(routes.LOGIN)}
      >
        Comenzar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    fontSize: 38,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 4,
  },
});