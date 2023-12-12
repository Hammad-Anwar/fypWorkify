import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import AuthNavigation from './navigation/AuthNavigation';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './navigation/BottomNavigation';

function Main() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName="AuthNavigation">
        <Stack.Screen
          options={{headerShown: false}}
          name="AuthNavigation"
          component={AuthNavigation}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="BottomNavigation"
          component={BottomNavigation}
        />
      </Stack.Navigator>
    </View>
  );
}

export default Main;
