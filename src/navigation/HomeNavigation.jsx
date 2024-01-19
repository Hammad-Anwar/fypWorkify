import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import Home from '../screens/Home';
import AccountSetting from '../screens/Home/AccountSetting';
import EditProfile from '../screens/Home/EditProfile';
import ProfileReview from '../screens/Home/ProfileReview';
import ChangePassword from '../screens/Home/ChangePassword';
import TopReviewNav from './TopReviewNav';
import AuthNavigation from './AuthNavigation';
import Authenticaion from '../screens/Authentication';
function HomeNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AccountSetting"
          component={AccountSetting}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TopReviewNav"
          component={TopReviewNav}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ChangePassword"
          component={ChangePassword}
        />
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="Authenticaion"
          component={Authenticaion}
        /> */}
      </Stack.Navigator>
    </>
  );
}

export default HomeNavigation;
