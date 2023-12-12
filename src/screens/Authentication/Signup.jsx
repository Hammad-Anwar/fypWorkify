import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

import gImg from '../../assets/Images/google-img.png';
import { Picker } from "@react-native-picker/picker";
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';

const Signup = ({navigation}) => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.headContainer}>
          <View>
            <Text style={styles.heading}>Register Account</Text>
            <Text style={styles.text}>Fill your details or continue</Text>
            <Text style={styles.text}>with google</Text>
          </View>
        </View>
        <CustomInput
          isIcon={true}
          isIconName={'email-outline'}
          placeholder="User"
          keyboardType="default"
        />
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomInput placeholder={'First Name'} keyboardType={'default'} style={{width: 160}}/>
          <CustomInput placeholder={'Last Name'} keyboardType={'default'} style={{width: 160}}/>
        </View>
        <CustomInput
          isIcon={true}
          isIconName={'email-outline'}
          placeholder="Email"
          keyboardType="email-address"
        />
        <CustomInput
          isIcon={true}
          isIconName={'lock-open-outline'}
          secureTextEntry={true}
          value={password}
          onChangeText={e => {
            setPassword(e);
          }}
          isPasswordIcon={true}
          placeholder="Password"
        />
        <View
          style={[
            styles.inputField,
            { borderRadius: 12, marginTop: 20, padding: 0 },
          ]}
        >
          <Picker
            style={styles.inputField}
            selectedValue={account}
            onValueChange={(itemValue) => setAccount(itemValue)}
          >
            <Picker.Item
              label="Select account type"
              value=""
              style={{ borderRadius: 12 }}
            />
            <Picker.Item label="Client" value="Client" />
            <Picker.Item label="Freelancer" value="Freelancer" />
          </Picker>
        </View>
        <CustomBtn lbl={'sign up'} style={{marginTop: 80}} />
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
            <Image source={gImg} style={{width: 35, height: 35}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text style={[styles.text, {fontSize: 16}]}>
            Already Have Account?{' '}
          </Text>
          <TouchableOpacity onPress={() => {navigation.navigate('Authentication')}}>
            <Text style={[styles.text, {fontSize: 16, fontWeight: '600'}]}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAE4E1',
    padding: 30,
  },
  headContainer: {
    // marginRight: 180,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#636363',
  },
  inputField: {
    backgroundColor: "#fff",
    color: "#636363",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
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

  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
export default Signup;
