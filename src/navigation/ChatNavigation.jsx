import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import Chat from '../screens/Chat';
import MessageBox from '../screens/Chat/Message';
function ChatNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <Stack.Navigator initialRouteName="Chat">
        <Stack.Screen
          options={{headerShown: false}}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MessageBox"
          component={MessageBox}
        />
      </Stack.Navigator>
    </>
  );
}

export default ChatNavigation;
