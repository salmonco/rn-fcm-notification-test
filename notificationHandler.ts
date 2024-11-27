import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {NavigationContainerRef} from '@react-navigation/native';

let navigationRef: React.RefObject<NavigationContainerRef> | null = null;

export const setNavigationRef = (
  ref: React.RefObject<NavigationContainerRef>,
) => {
  navigationRef = ref;
};

export const configurePushNotifications = () => {
  PushNotification.configure({
    onRegister: function (token: any) {
      console.log('TOKEN:', token);
    },

    onNotification: function (notification: any) {
      console.log('NOTIFICATION:', notification);
      const alarmId = notification.data.alarmId;
      if (alarmId && navigationRef && navigationRef.current) {
        navigationRef.current.navigate('TargetScreen', {alarmId});
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification: any) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },

    onRegistrationError: function (err: Error) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'riders',
      channelName: '앱 전반',
      channelDescription: '앱 실행하는 알림',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created: boolean) =>
      console.log(`createChannel riders returned '${created}'`),
  );
};
