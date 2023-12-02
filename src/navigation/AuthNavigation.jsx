import React from 'react';

import Welcome from '../screens/Authentication/Welcome';
import Authenticaion from '../screens/Authentication';
import Signup from '../screens/Authentication/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
function AuthNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor="#DAE4E1"
        barStyle="dark-content"
      />
      <Stack.Navigator initialRouteName="Authenticaion">
        <Stack.Screen
          options={{headerShown: false}}
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Authenticaion"
          component={Authenticaion}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Signup"
          component={Signup}
        />
      </Stack.Navigator>
    </>
  );
}

export default AuthNavigation;
