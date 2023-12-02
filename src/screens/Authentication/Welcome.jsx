import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Welcome({ navigation }) {
  return (
    <SafeAreaView>
        <Text style={{color: '#000'}}>
            Welcome Screen
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Authenticaion')}>
          <Text style={{color: '#000'}}>Login</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Welcome