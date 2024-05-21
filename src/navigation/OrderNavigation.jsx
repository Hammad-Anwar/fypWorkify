import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import Orders from '../screens/Order/Orders';
import OrderDetail from '../screens/Order/OrderDetail';
import Order from '../screens/Order';
function OrderNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor="#fff" 
        barStyle="dark-content"
      />
      <Stack.Navigator initialRouteName="Order">
        <Stack.Screen
          options={{headerShown: false}}
          name="Order"      
          component={Order}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Orders"      
          component={Orders}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="OrderDetail"
          component={OrderDetail}
        />
        
      </Stack.Navigator>
    </>
  );
}

export default OrderNavigation;
