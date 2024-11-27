import messaging from '@react-native-firebase/messaging';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {useEffect} from 'react';
import LoadingScreen from './src/screens/Loading';
import PushScreen from './src/screens/Push';
// import Config from 'react-native-config';
// import axios from 'axios';

export type RootStackParamList = {
  LoadingScreen: undefined;
  PushScreen: {alarmId: number};
};

const Tab = createBottomTabNavigator();

function AppInner() {
  // 토큰 설정
  useEffect(() => {
    async function getToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();
        console.log('phone token', token);
        // return axios.post(`${Config.API_URL}/phonetoken`, {token});
      } catch (error) {
        console.error(error);
      }
    }

    getToken();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{
          title: '로딩',
          tabBarActiveTintColor: 'blue',
        }}
      />
      <Tab.Screen
        name="PushScreen"
        component={PushScreen}
        options={{
          title: '푸시',
          tabBarActiveTintColor: 'blue',
        }}
      />
    </Tab.Navigator>
  );
}

export default AppInner;
