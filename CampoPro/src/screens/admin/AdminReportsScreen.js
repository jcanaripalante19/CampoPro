import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ActivityIndicator, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import { getAdminReportData } from '../../services/adminService';

export default function AdminReportsScreen() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadReport = async () => {
    setLoading(true);

    try {
      const result = await getAdminReportData();
      setReport(result);
    } catch (error) {
      console.log('Error reporte admin:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadReport();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportes</Text>
      <Text style={styles.subtitle}>
        Indicadores básicos de funcionamiento de CampoPro.
      </Text>

      <Button mode="outlined" style={styles.button} onPress={loadReport}>
        Actualizar
      </Button>

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <>
          <Card style={styles.card}>
            <Card.Title
              title={`${report?.totalReservations || 0}`}
              subtitle="Reservas totales"
            />
          </Card>

          <Card style={styles.card}>
            <Card.Title
              title={`${report?.totalIncome || 0} €`}
              subtitle="Ingresos simulados por reservas"
            />
          </Card>

          <Card style={styles.card}>
            <Card.Title
              title={report?.mostReservedFieldName || 'Sin datos'}
              subtitle={`Campo más reservado · ${report?.mostReservedCount || 0} reservas`}
            />
          </Card>

          <Card style={styles.card}>
            <Card.Title
              title={`${report?.cancelledReservations || 0}`}
              subtitle="Reservas canceladas"
            />
          </Card>

          <Card style={styles.card}>
            <Card.Title
              title={`${report?.activeBusinesses || 0}`}
              subtitle="Negocios activos"
            />
          </Card>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 12,
  },
  button: {
    borderRadius: 14,
    marginBottom: 14,
  },
  loading: {
    marginTop: 30,
  },
});