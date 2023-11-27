import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../screens/Authentication/Welcome';
import Authenticaion from '../screens/Authentication';
import Signup from '../screens/Authentication/Signup';
function AuthNavigation() {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName="Welcome">
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
