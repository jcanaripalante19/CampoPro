import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions() {
  const currentStatus = await Notifications.getPermissionsAsync();

  if (currentStatus.status === 'granted') {
    return true;
  }

  const requestStatus = await Notifications.requestPermissionsAsync();

  return requestStatus.status === 'granted';
}

export async function scheduleReservationNotification({ fieldName, date, startTime }) {
  const hasPermission = await requestNotificationPermissions();

  if (!hasPermission) {
    return {
      success: false,
      message: 'No se concedieron permisos de notificación.',
    };
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Reserva confirmada',
      body: `Recuerda tu reserva en ${fieldName} el ${date} a las ${startTime}.`,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });

  return {
    success: true,
    message: 'Notificación local programada correctamente.',
  };
}