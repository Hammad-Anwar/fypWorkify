import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInputBase,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import profileImg from '../../assets/Images/profileImg.jpg';
import filterIcon from '../../assets/icons/filter.png';
import CustomInput from '../../components/CustomInput';
import {Colors} from '../../constants/theme';
import SmallCard from '../../components/SmallCard';
import LargeCard from '../../components/LargeCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home({navigation}) {

  const checkAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem('@auth_token');
      const user = await AsyncStorage.getItem('@user');
      if (authToken) {
        console.log('Auth Token:', authToken);
        console.log('User:', user);
        // Perform any additional actions based on the authToken value
      } else {
        console.log('Auth Token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error checking Auth Token:', error);
    }
  };
  
  // Call the function to check the auth token
  checkAuthToken();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.row}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="menu"
              size={24}
              color={Colors.primary.darkgray}
            />
          </TouchableOpacity>
          <Text style={{color: Colors.primary.black}}>Workify</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('AccountSetting')}}>
            <Image source={profileImg} style={styles.imgStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <CustomInput
            isIcon={true}
            placeholder="Search for a job..."
            isIconName="magnify"
            keyboardType="default"
            style={{
              backgroundColor: Colors.primary.sub,
              width: '78%',
              padding: 0,
            }}
            containerStyle={{
              backgroundColor: Colors.primary.sub,
              paddingRight: 0,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary.main,
              padding: 12,
              borderRadius: 12,
              marginTop: 20,
            }}>
            <Image source={filterIcon} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <View style={[styles.row, {marginTop: 30}]}>
          <Text style={styles.largeTxt}>Featured Posts</Text>
          <TouchableOpacity>
            <Text style={styles.smallTxt}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}>
          <SmallCard />
          <SmallCard />
          <SmallCard />
        </ScrollView>
        <View style={{marginTop: 20}}>
          <View style={styles.line}></View>
          <View style={{marginTop: 20}}>

            <LargeCard />
            <LargeCard />
            <LargeCard />
            <LargeCard />
          </View>
          
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
    paddingTop: 20
  },
  imgStyle: {
    width: 34,
    height: 34,
    borderRadius: 25,
  },
  scrollContent: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  iconStyle: {
    width: 26,
    height: 26,
  },
  largeTxt: {
    fontSize: 16,
    color: Colors.primary.lightBlack,
    fontWeight: 'bold',
  },
  smallTxt: {
    fontSize: 14,
    color: Colors.primary.darkgray,
    fontWeight: '400',
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary.lightGray,
  },
});
export default Home;
