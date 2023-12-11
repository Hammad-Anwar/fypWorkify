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
import SmallCard from '../../components/SmallCard';

function ProfileReview({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.row}>
          <TouchableOpacity
            style={{marginRight: '25%'}}
            onPress={() => navigation.navigate('AccountSetting')}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={Colors.primary.lightBlack}
            />
          </TouchableOpacity>
          <Text style={styles.largeTxt}>Profile Review</Text>
        </View>
        <View style={styles.line}></View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          
          <Text style={[styles.largeTxt, {fontSize: 26}]}>4.2</Text>
          <Text style={styles.largeTxt}>Rating</Text>
          <Text style={styles.smallTxt}>*Average rating of your profile</Text>
        </View>
        <View style={styles.line}></View>

        <View>
            <SmallCard />
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
    fontSize: 14,
    fontWeight: '400',
    color: Colors.primary.darkgray,
  },
  line: {
    marginVertical: 20,
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary.lightGray,
  },
});

export default ProfileReview;
