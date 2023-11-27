import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'

function Welcome() {
  return (
    <SafeAreaView>
        <Text>
            Welcome Screen
        </Text>
        <TouchableOpacity>
          <Text>Login</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Welcome