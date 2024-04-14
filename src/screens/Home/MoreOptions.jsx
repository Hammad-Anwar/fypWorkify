import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import {Colors} from '../../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBtn from '../../components/CustomBtn';
import LargeCard from '../../components/LargeCard';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import apiRequest from '../../api/apiRequest';
import urlType from '../../constants/UrlConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import CustomModal from '../../components/CustomModal';
import {useStateValue} from '../../context/GlobalContextProvider';
import profileImg from '../../assets/Images/profileImg.jpg';
import SettingCard from '../../components/SettingCard';

function MoreOptions({route, navigation}) {
  //   const {userInfo, userDetail} = route.params;
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user']);
  const [{}, dispatch] = useStateValue();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  console.log('sds', userData?.user?.useraccount_id);
  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('@user');
    dispatch({
      type: 'SET_LOGIN',
      isLogin: false,
    });
    setLogoutModalVisible(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={[styles.row]}>
          <TouchableOpacity
            style={{marginRight: '32%'}}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={Colors.primary.lightBlack}
            />
          </TouchableOpacity>
          <Text style={styles.largeTxt}>Settings</Text>
        </View>
        <View style={styles.line}></View>
        <ScrollView style={styles.scrollContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: userData?.user.user_account.image}}
              style={styles.imgStyle}
            />
            <View style={{marginLeft: 18}}>
              <Text style={styles.largeTxt}>
                {userData?.user.user_account.first_name}{' '}
                {userData?.user.user_account.last_name}
              </Text>
              <Text
                style={[
                  styles.largeTxt,
                  {fontSize: 16, fontWeight: '400', fontStyle: 'italic'},
                ]}>
                {userData?.user.user_account.user_name}
              </Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <SettingCard
            iconName={'bookmark-outline'}
            text={'Dispute Center'}
            onPress={() => {
              navigation.navigate('Dispute', {
                user_id: userData?.user?.useraccount_id,
              });
            }}
          />
          <SettingCard
            iconName={'bookmark-outline'}
            text={'Saved Posts'}
            onPress={() => {
              navigation.navigate('SavedPost', {
                user_id: userData?.user?.useraccount_id,
              });
            }}
          />
          <SettingCard
            iconName={'bookmark-outline'}
            text={'Change password'}
            onPress={() => {
              navigation.navigate('ChangePassword', {
                user_id: userData?.user?.useraccount_id,
              });
            }}
          />
          <SettingCard
            iconName={'power'}
            textColor={'red'}
            text={'Sign Out'}
            iconColor={'red'}
            onPress={handleLogout}
          />
        </ScrollView>
      </SafeAreaView>
      <CustomModal
        visible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onAction={confirmLogout}
        action="Logout"
        message="Are you sure you want to log out?"
      />
    </>
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
    marginLeft: 10,
    fontSize: 18,
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

export default MoreOptions;
