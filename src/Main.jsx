import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import AuthNavigation from './navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './navigation/BottomNavigation';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();
function Main() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
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
      </NavigationContainer>
      <FlashMessage position="top" duration={5000} hideOnPress={true} />
    </View>
  );
}

export default Main;
