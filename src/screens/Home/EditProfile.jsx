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
import profileImg from '../../assets/Images/profileImg.jpg';
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';
import {Picker} from '@react-native-picker/picker';
import {useQuery, useMutation} from '@tanstack/react-query';
import apiRequest from '../../api/apiRequest';
import urlType from '../../constants/UrlConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import ImageCropPicker from 'react-native-image-crop-picker';

function EditProfile({navigation}) {
  const [overview, setOverview] = useState('');
  const [experience, setExperience] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const accountType = 1;
  const countries = [
    {label: 'United States', value: 'US'},
    {label: 'Canada', value: 'CA'},
    {label: 'Pakistan', value: 'PK'},
    {label: 'Germany', value: 'DE'},
    // Add more countries as needed
  ];

  const chooseImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 82,
        height: 82,
        cropping: true,
      });
      setImageUri(image.path);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const renderImage = () => {
    if (imageUri) {
      return <Image source={{uri: imageUri}} style={styles.imgStyle} />;
    } else {
      return (
        <Image
          source={profileImg} // Set the path to your default image
          style={styles.imgStyle}
        />
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.row}>
          <TouchableOpacity
            style={{marginRight: '30%'}}
            // onPress={() => navigation.navigate('AccountSetting')}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={Colors.primary.lightBlack}
            />
          </TouchableOpacity>
          <Text style={styles.largeTxt}>Edit Profile</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.containerImg, {marginRight: 10}]}
            onPress={chooseImage}>
            {renderImage()}
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
        {accountType == 1 ? (
          <>
            <View style={{marginTop: 20}}>
              <Text style={styles.smallTxt}>Overview</Text>
              <CustomInput
                style={{backgroundColor: Colors.primary.sub, marginTop: 5}}
                placeholder="Write the overview of your profile"
                keyboardType="default"
                value={overview}
                onChangeText={text => {
                  setOverview(text);
                }}
                multiline={true}
                numberOfLines={2}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.smallTxt}>Experience</Text>
              <CustomInput
                style={{
                  backgroundColor: Colors.primary.sub,
                  marginTop: 5,
                }}
                placeholder="Write the experience of your work in detail"
                keyboardType="default"
                value={experience}
                onChangeText={text => {
                  setExperience(text);
                }}
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.smallTxt}>Portfolio Links</Text>
              <CustomInput
                style={{backgroundColor: Colors.primary.sub, marginTop: 5}}
                placeholder="Add any Links"
                keyboardType="default"
                value={link}
                onChangeText={text => {
                  setLink(text);
                }}
                multiline={true}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {borderRadius: 12, marginTop: 20, padding: 0},
              ]}>
              <Picker
                style={[styles.inputField]}
                dropdownIconColor={Colors.primary.darkgray}
                dropdownIconRippleColor={Colors.primary.lightGray}
                selectedValue={location}
                onValueChange={itemValue => setLocation(itemValue)}>
                <Picker.Item
                  label="Select Your Country"
                  value=""
                  style={{borderRadius: 12}}
                />
                {countries.map((country, index) => (
                  <Picker.Item
                    key={index}
                    label={country.label}
                    value={country.value}
                    style={{borderRadius: 12}}
                  />
                ))}
              </Picker>
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
                <Text
                  style={{color: Colors.primary.lightBlack, marginRight: 20}}>
                  Change Password
                </Text>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={22}
                  color={Colors.primary.lightBlack}
                />
              </TouchableOpacity>
            </View>
            <CustomBtn
              lbl={'Continue'}
              style={{marginTop: 20, marginBottom: 60}}
              // onPress={handleContinue}
              // loading={continueMutation.isPending}
              // onPress={() => navigation.navigate('AddSkills')}
            />
          </>
        ) : (
          <>
            <View style={{marginTop: 20}}>
              <Text style={styles.smallTxt}>Overview</Text>
              <CustomInput
                style={{backgroundColor: Colors.primary.sub, marginTop: 5}}
                placeholder="Write the overview of your profile"
                keyboardType="default"
                value={overview}
                onChangeText={text => {
                  setOverview(text);
                }}
                multiline={true}
                numberOfLines={2}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {borderRadius: 12, marginTop: 20, padding: 0},
              ]}>
              <Picker
                style={[styles.inputField]}
                dropdownIconColor={Colors.primary.darkgray}
                dropdownIconRippleColor={Colors.primary.lightGray}
                selectedValue={location}
                onValueChange={itemValue => setLocation(itemValue)}>
                <Picker.Item
                  label="Select Your Country"
                  value=""
                  style={{borderRadius: 12}}
                />
                {countries.map((country, index) => (
                  <Picker.Item
                    key={index}
                    label={country.label}
                    value={country.value}
                    style={{borderRadius: 12}}
                  />
                ))}
              </Picker>
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
                <Text
                  style={{color: Colors.primary.lightBlack, marginRight: 20}}>
                  Change Password
                </Text>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={22}
                  color={Colors.primary.lightBlack}
                />
              </TouchableOpacity>
            </View>
            <CustomBtn
              lbl={'Continue'}
              style={{marginTop: 80, marginBottom: 210}}
              // onPress={handleSignup}
            />
          </>
        )}

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
