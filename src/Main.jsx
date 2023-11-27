import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import AuthNavigation from './navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';

function Main() {
  const Stack = createStackNavigator();
  return (
    <View style={{flex: 1, color: '#000'}}>
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthNavigation">
          <Stack.Screen
            options={{headerShown: false}}
            name="AuthNavigation"
            component={AuthNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
      <Text>Hammad</Text>
      <TouchableOpacity><Text>Button</Text></TouchableOpacity>
    </View>
  );
}

export default Main;
