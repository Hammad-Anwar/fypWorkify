import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomInput from '../../components/CustomInput';

function Authenticaion({navigation}) {
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.headContainer}>
        <View>
          <Text style={styles.heading}>Welcome Back!</Text>
          <Text style={styles.text}>Fill your details or continue</Text>
          <Text style={styles.text}>with google</Text>
        </View>
      </View>
      <CustomInput
        isIconName={'email-outline'}
        placeholder="Email"
        keyboardType="email-address"
      />
      <CustomInput
        isIconName={'lock-open-outline'}
        secureTextEntry={true}
        value={password}
        onChangeText={e => {
          setPassword(e);
        }}
        isPasswordIcon={true}
        placeholder="Password"
      />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 5,
        }}>
        <Text style={[styles.text, {fontWeight: '600'}]}>Forget Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, {marginTop: 80}]}>
        <Text style={styles.btnText}>LOG IN</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <View style={styles.line}></View>
        <Text style={styles.text}>Or Continue with</Text>
        <View style={styles.line}></View>
      </View>
      <View
        style={{
          flexDirection: 'col',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <TouchableOpacity style={styles.gBtn}>
          {/* <Image source={gImg} style={{width: 35, height: 35}} /> */}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text style={[styles.text, {fontSize: 16}]}>New User? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={[styles.text, {fontSize: 16, fontWeight: '600', color: '#000'}]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAE4E1',
    padding: 20,
  },
  headContainer: {
    // marginRight: 180,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  heading: {
    color: '#000',
    fontSize: 26,
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#636363',
  },
  // fieldContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  //   padding: 10,
  //   borderRadius: 8,
  // },
  // inputField: {
  //   backgroundColor: "#fff",
  //   color: "#636363",
  //   padding: 5,
  //   paddingHorizontal: 10,
  // },
  btn: {
    backgroundColor: '#F6FF82',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  line: {
    height: 1,
    width: 50,
    backgroundColor: '#636363',
    marginHorizontal: 10,
  },
  gBtn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 14,
    backgroundColor: '#fff',
  },
});
export default Authenticaion;
