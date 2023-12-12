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
import profileImg from '../../assets/Images/profileImg.jpg';
import CustomBtn from '../../components/CustomBtn';
import LargeCard from '../../components/LargeCard';
function AccountSetting({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <TouchableOpacity
            // style={{marginRight: '30%'}}
            onPress={() => navigation.navigate('Home')}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={Colors.primary.lightBlack}
            />
          </TouchableOpacity>
          <Text style={styles.largeTxt}>Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Authenticaion')}>
            <MaterialCommunityIcons
              name="power"
              size={30}
              color="red"
            />
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={profileImg} style={styles.imgStyle} />
          <Text style={styles.largeTxt}>John William</Text>
          <View style={[styles.row, {marginVertical: 20}]}>
            <View style={{alignItems: 'center', marginRight: 35}}>
              <Text style={styles.smallTxt}>20</Text>
              <Text style={styles.smallTxt}>Posts</Text>
            </View>
            <View style={{alignItems: 'center', marginRight: 35}}>
              <Text style={styles.smallTxt}>4.2</Text>
              <Text style={styles.smallTxt}>Rating</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.smallTxt}>20</Text>
              <Text style={styles.smallTxt}>Jobs</Text>
            </View>
          </View>
          <View style={styles.row}>
            <CustomBtn
              lbl={'Edit Profile'}
              lblStyle={{
                textTransform: 'capitalize',
              }}
              style={{marginRight: 20, paddingHorizontal: 30, paddingVertical: 10}}
              onPress={() => navigation.navigate('EditProfile')}
            />
            <CustomBtn
              lbl={'Profile Review'}
              lblStyle={{
                textTransform: 'capitalize',
              }}
              style={{ paddingHorizontal: 30, paddingVertical: 10}}
              onPress={() => navigation.navigate('TopReviewNav')}
            />
          </View>
        </View>
        <View style={styles.line}></View>
        <LargeCard/>
        <LargeCard/>
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
  imgStyle: {
    width: 82,
    height: 82,
    borderRadius: 55,
    marginTop: 20,
    marginBottom: 10,
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
  line: {
    marginVertical: 20,
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary.lightGray,
  },
});

export default AccountSetting;
