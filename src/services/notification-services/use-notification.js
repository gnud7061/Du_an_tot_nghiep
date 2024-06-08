import {PermissionsAndroid} from 'react-native';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function useNotifacation(){
     const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
      
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          getFcmToken();
        }
      };
      
      // get fcmToken to send notification
       const getFcmToken = async () => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
          try {
            const token = await messaging().getToken();
      
            if (token) {
              await AsyncStorage.setItem('fcmToken', token);
            }
          } catch (error) {
            console.log(`Can not get fcm token ${error}`);
          }
        }

}

return requestUserPermission;

}

