// utils/notificationHelper.js
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

export const configureNotification = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('LOCAL NOTIFICATION ==>', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });

  // Channel for Android
  PushNotification.createChannel(
    {
      channelId: 'training-channel',
      channelName: 'Training Notifications',
      channelDescription: 'Notifikasi sesi latihan',
      importance: 4,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};

export const scheduleTrainingNotification = (session, trainingDate) => {
  const sessionDateTime = new Date(`${trainingDate}T${session.time_start}:00`);

  PushNotification.localNotificationSchedule({
    channelId: 'training-channel',
    title: '⏰ Jadwal Latihan!',
    message: `Saatnya latihan (${session.time_start} - ${session.time_end}) - ${session.periodisasi}`,
    date: sessionDateTime, // waktu notifikasi muncul
    allowWhileIdle: true,
    importance: 'high',
    priority: 'high',
    playSound: true,
  });

  console.log('Scheduled notification at:', sessionDateTime);
};
