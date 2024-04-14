import React from 'react';
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
function Complain({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row, {marginBottom: 20}]}>
        <TouchableOpacity
          style={{marginRight: '23%'}}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={32}
            color={Colors.primary.lightBlack}
          />
        </TouchableOpacity>
        <Text style={styles.largeTxt}>Complain Details</Text>
      </View>
      {/* <View style={styles.line}></View> */}
      <Text style={[styles.smallTxt]}>Complain Title</Text>

      <View
        style={{
          marginTop: 10,
          backgroundColor: Colors.primary.lightGray,
          padding: 20,
          borderRadius: 12,
        }}>
        <Text style={[styles.smallTxt, {textAlign: 'right'}]}>Complain details..</Text>
      </View>
      <View style={styles.line}></View>

      <CustomInput
        placeholder="Write the respond..."
        keyboardType="default"
        multiline={true}
        numberOfLines={3}
        style={{
          backgroundColor: Colors.primary.sub,
        }}

        // value={description}
        // onChangeText={text => {
        //   setDescription(text);
        // }}
      />

      <View style={{marginTop: 20}}>
        <CustomBtn
          lbl="Send"
          // onPress={() => navigation.navigate("NewDispute")}
          // loading={loginMutation.isPending}
        />
      </View>
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
    color: Colors.primary.darkgray,
  },
  line: {
    marginVertical: 20,
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary.lightGray,
  },
});

export default Complain;
