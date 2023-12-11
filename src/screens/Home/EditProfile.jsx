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
import CustomInput from '../../components/CustomInput';

function EditProfile({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.row}>
          <TouchableOpacity
            style={{marginRight: '30%'}}
            onPress={() => navigation.navigate('AccountSetting')}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={Colors.primary.lightBlack}
            />
          </TouchableOpacity>
          <Text style={styles.largeTxt}>Edit Profile</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.containerImg, {marginRight: 10}]}>
            <Image source={profileImg} style={styles.imgStyle} />
            <View style={styles.overlay}>
              <MaterialCommunityIcons
                name="camera"
                size={32}
                color={Colors.primary.sub}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.largeTxt}>John William</Text>
        </View>
        <View style={styles.line}></View>
        <View>
          <Text style={styles.smallTxt}>User Name</Text>
          <CustomInput
            placeholder={'jdskdsa'}
            keyboardType={'default'}
            style={{backgroundColor: Colors.primary.sub, marginTop: 5}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.smallTxt}>User Name</Text>
          <CustomInput
            placeholder={'Hello'}
            keyboardType={'default'}
            style={{backgroundColor: Colors.primary.sub, marginTop: 5}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.smallTxt}>Selected Skills</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View style={styles.skillContainer}>
              <Text style={{color: Colors.primary.lightBlack, marginRight: 5}}>
                UI / UX Designer
              </Text>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="close"
                  size={22}
                  color={Colors.primary.lightBlack}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.skillContainer}>
              <Text style={{color: Colors.primary.lightBlack, marginRight: 5}}>
                UI / UX Designer
              </Text>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="close"
                  size={22}
                  color={Colors.primary.lightBlack}
                />
              </TouchableOpacity>
            </View>
          </View>
          <CustomInput
            placeholder={'Other Skills'}
            keyboardType={'default'}
            style={{backgroundColor: Colors.primary.sub, marginTop: 5}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginVertical: 10,
            marginBottom: 40,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            style={[styles.skillContainer, {marginRight: 0}]}>
            <Text style={{color: Colors.primary.lightBlack, marginRight: 20}}>
              Change Password
            </Text>

            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={Colors.primary.lightBlack}
            />
          </TouchableOpacity>
        </View>
        <CustomBtn lbl={'Changed'} />
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
    resizeMode: 'cover',
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
  containerImg: {
    position: 'relative',
    overflow: 'hidden',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay absolutely
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 70
  },
  skillContainer: {
    backgroundColor: Colors.primary.sub,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginRight: 10,
    marginTop: 5,
  },
});

export default EditProfile;
