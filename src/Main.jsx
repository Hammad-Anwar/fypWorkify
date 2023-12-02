import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import AuthNavigation from './navigation/AuthNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
      </Stack.Navigator>
    </View>
  );
}

export default Main;
