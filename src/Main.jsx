import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './navigation/AuthNavigation';
import BottomNavigation from './navigation/BottomNavigation';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function Main() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userToken = await AsyncStorage.getItem('@auth_token');

      if (userToken) {
        setIsAuthenticated(true);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error checking user:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    // <NavigationContainer>
    <View style={{flex: 1}}>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="BottomNavigation"
            component={BottomNavigation}
          />
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="AuthNavigation"
            component={AuthNavigation}
          />
        )}
      </Stack.Navigator>
      <FlashMessage position="top" duration={5000} hideOnPress={true} />
    </View>
    // </NavigationContainer>
  );
}

export default Main;
