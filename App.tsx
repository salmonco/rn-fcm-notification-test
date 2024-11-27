import messaging from '@react-native-firebase/messaging';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import * as React from 'react';
import AppInner, {RootStackParamList} from './AppInner';
import {configurePushNotifications} from './notificationHandler';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

configurePushNotifications(navigationRef);

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppInner />
    </NavigationContainer>
  );
}

export default App;
