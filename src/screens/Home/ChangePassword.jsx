import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';

function ChangePassword({navigation}) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.row}>
          <TouchableOpacity
            style={{marginRight: '20%'}}
            onPress={() => navigation.navigate('EditProfile')}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={Colors.primary.lightBlack}
            />
          </TouchableOpacity>
          <Text style={styles.largeTxt}>Password Change</Text>
        </View>

        <CustomInput
          isIcon={true}
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={e => {
            setOldPassword(e);
          }}
          isPasswordIcon={true}
          placeholder="Old Password"
          style={{backgroundColor: Colors.primary.sub, margin: 0}}
          containerStyle={{backgroundColor: Colors.primary.sub, marginTop: 40}}
        />

        <CustomInput
          isIcon={true}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={e => {
            setNewPassword(e);
          }}
          isPasswordIcon={true}
          placeholder="New Password"
          style={{backgroundColor: Colors.primary.sub, margin: 0}}
          containerStyle={{backgroundColor: Colors.primary.sub, margin: 0}}
        />

        <CustomInput
          isIcon={true}
          secureTextEntry={true}
          value={retypePassword}
          onChangeText={e => {
            setRetypePassword(e);
          }}
          isPasswordIcon={true}
          placeholder="Re-type Password"
          style={{backgroundColor: Colors.primary.sub, margin: 0}}
          containerStyle={{backgroundColor: Colors.primary.sub, margin: 0}}
        />
        <View style={{marginTop: 60}}>
          <CustomBtn lbl={'Password Changed'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  scrollContent: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  largeTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary.lightBlack,
  },
  smallTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.lightBlack,
  },
});

export default ChangePassword;
