import React, {useCallback, useEffect, useRef} from 'react';
import {JitsiMeeting} from '@jitsi/react-native-sdk';
import {useNavigation} from '@react-navigation/native';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

const requestAndroidCalendarPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
        {
          title: 'Calendar Permission',
          message: 'We need access to your calendar to sync your meetings.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Calendar permission granted');
      } else {
        Alert.alert(
          'Permission Required',
          'Calendar access is required to sync your meetings. Please enable it in the settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
const Meeting = () => {
  const jitsiMeeting = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestAndroidCalendarPermission();
    }
  }, []);

  const onReadyToClose = useCallback(() => {
    navigation.goBack();
    jitsiMeeting.current.close();
  }, [navigation]);

  const eventListeners = {
    onReadyToClose,
  };



  return (
    <JitsiMeeting
      config={{
        hideConferenceTimer: true,
        subject: 'React Native SDK',
        customToolbarButtons: [
          {
            icon: 'https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png',
            id: 'btn1',
            text: 'Button one',
          },
          {
            icon: 'https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png',
            id: 'btn2',
            text: 'Button two',
          },
        ],
      }}
      eventListeners={eventListeners}
      flags={{
        'invite.enabled': true,
      }}
      ref={jitsiMeeting}
      style={{flex: 1}}
      room={'ThisIsNotATestRoomName'}
      serverURL={'https://meet.jit.si/'}
    />
  );
};

export default Meeting;
