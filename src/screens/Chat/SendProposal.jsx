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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import CustomCheckBox from '../../components/CustomCheckBox';

function SendProposal({route, navigation}) {
  const {jobData} = route.params;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  console.log(jobData);
  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  //   const [first_name, setFirst_name] = useState('');
  //   const [last_name, setLast_name] = useState('');
  //   const [overview, setOverview] = useState('');
  //   const [experience, setExperience] = useState('');
  //   const [link, setLink] = useState('');
  //   const [location, setLocation] = useState('');
  //   const [imageUri, setImageUri] = useState();

  //   const userApiDetail = useQuery({
  //     queryKey: ['userApiDetail', userInfo?.userType, userInfo?.id],
  //     queryFn: async () => {
  //       try {
  //         const response = await apiRequest(urlType.BACKEND, {
  //           method: 'get',
  //           url: `user?id=${userInfo?.id}&userType=${userInfo?.userType}`,
  //         });
  //         if (response.data) {
  //           setFirst_name(response?.data?.user_account?.first_name);
  //           setLast_name(response?.data?.user_account?.last_name);
  //           setOverview(response?.data?.overview);
  //           setExperience(response?.data?.experience)
  //           setLink(response?.data?.links);
  //           setLocation(response?.data?.location);
  //           setImageUri(response?.data?.user_account?.image);
  //           return response.data;
  //         } else {
  //           throw new Error('Data not available');
  //         }
  //       } catch (error) {
  //         console.error('Error fetching user detail:', error);
  //         throw error;
  //       }
  //     },
  //     enabled: userInfo ? true : false,
  //   });
  //   console.log('das',location)

  const updateMutation = useMutation({
    mutationFn: async data => {
      const response = await apiRequest(urlType.BACKEND, {
        method: 'put',
        url: `user`,
        data,
      });
      return response;
    },
    onSuccess: async e => {
      if (e.status === 200) {
        console.log('sada', e.data);
        showMessage({
          message: e.message,
          type: 'success',
          color: '#fff',
          backgroundColor: Colors.primary.green,
          floating: true,
        });
        // navigation.navigate('AddSkills');
      } else if (e.status === 404) {
        showMessage({
          message: e.message,
          type: 'danger',
          color: '#fff',
          backgroundColor: Colors.primary.red,
          floating: true,
        });
      } else {
        showMessage({
          message: e.message || 'An Error occured',
          type: 'danger',
          color: '#fff',
          backgroundColor: Colors.primary.red,
          floating: true,
        });
      }
    },
  });

  //   const handleUpdate = async () => {

  //     if (userInfo?.userType === 'freelancer') {
  //       if (
  //         overview.length > 0 &&
  //         experience.length > 0 &&
  //         link.length > 0 &&
  //         countries.length > 0
  //       ) {
  //         const data = {
  //           user_id: parseInt(userApiDetail?.data?.useraccount_id),
  //           image: imageUri,
  //           first_name: first_name,
  //           last_name: last_name,
  //           userData: {
  //             overview: overview,
  //             experience: experience,
  //             links: link,
  //             location: location,
  //           },
  //         };
  //         await updateMutation.mutate(data);
  //         userApiDetail.refetch();
  //         // console.log(loginMutation.isLoading);
  //         // console.log(data);
  //       } else {
  //         showMessage({
  //           message: 'Please fill all the fields Or upload image',
  //           type: 'danger',
  //           color: '#fff',
  //           backgroundColor: Colors.primary.red,
  //           floating: true,
  //         });
  //       }
  //     }
  //     // Client
  //     else if (userInfo?.userType === 'client') {
  //       if (overview.length > 0 && countries.length > 0) {
  //         const data = {
  //           user_id: parseInt(userApiDetail?.data?.useraccount_id),
  //           first_name: first_name,
  //           last_name: last_name,
  //           image: imageUri,
  //           userData: {
  //             overview: overview,
  //             location: location,
  //           },
  //         };
  //         await updateMutation.mutate(data);
  //         userApiDetail.refetch();
  //         // console.log(loginMutation.isLoading);
  //         // console.log(data);
  //       } else {
  //         showMessage({
  //           message: 'Please fill all the fields Or upload image',
  //           type: 'danger',
  //           color: '#fff',
  //           backgroundColor: Colors.primary.red,
  //           floating: true,
  //         });
  //       }
  //     }
  //   };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.row}>
          <TouchableOpacity
            style={{marginRight: '25%'}}
            onPress={() => navigation.navigate('Chat')}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={Colors.primary.lightBlack}
            />
          </TouchableOpacity>
          <Text style={styles.largeTxt}>Send Proposal</Text>
        </View>
        <View style={styles.postBox}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <View style={[styles.row, {justifyContent: 'flex-start'}]}>
              <Image
                source={
                  jobData?.profile_image
                    ? {uri: jobData?.profile_image}
                    : {profileImg}
                }
                style={styles.cardImg}
              />

              <View style={{marginLeft: 10}}>
                <Text
                  style={[
                    styles.txt,
                    {
                      fontSize: 14,
                      fontWeight: '600',
                      color: Colors.primary.lightBlack,
                    },
                  ]}>
                  {jobData?.first_name} {jobData?.last_name}
                </Text>
                <Text style={[styles.txt]}>
                  {formatDate(jobData?.updated_at)} | <>{jobData?.skill_name}</>{' '}
                </Text>
              </View>
            </View>
            {jobData?.feature_job ? (
              <MaterialIcons name="star" size={24} color={Colors.primary.red} />
            ) : null}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View>
              <Text style={styles.txt}>{jobData?.job_description}</Text>
            </View>
            <View>
              {jobData?.image ? (
                <Image
                  source={{uri: jobData?.image}}
                  style={{width: 100, height: 100, resizeMode: 'contain'}}
                />
              ) : null}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View style={[styles.row, {justifyContent: 'flex-start'}]}>
              <Text style={styles.txt}>Payment: </Text>
              <Text
                style={[
                  styles.txt,
                  {color: Colors.primary.lightBlack, fontWeight: '600'},
                ]}>
                ${jobData?.payment_amount}
              </Text>
            </View>
            <View style={[styles.row, {justifyContent: 'flex-start'}]}>
              <Text style={styles.txt}>Duration: </Text>
              <Text
                style={[
                  styles.txt,
                  {color: Colors.primary.lightBlack, fontWeight: '600'},
                ]}>
                {jobData?.duration}
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={[styles.smallTxt, {marginBottom: 5}]}>Select Task</Text>
          {jobData?.task.map((task, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <CustomCheckBox
                label={task.task_description}
                simpleCheckBox={true}
                isChecked={isChecked}
                onChange={handleCheckboxChange}
              />
            </View>
          ))}
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.smallTxt}>Proposal Description</Text>
          <CustomInput
            style={{backgroundColor: Colors.primary.sub, marginTop: 5}}
            placeholder="Write the proposal desription"
            keyboardType="default"
            // value={overview}
            // onChangeText={text => {
            //   setOverview(text);
            // }}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.smallTxt}>Duration</Text>
              <CustomInput
                placeholder={'Time Peroid in days'}
                keyboardType={'numeric'}
                style={{backgroundColor: Colors.primary.sub, width: 160}}
                //   value={first_name}
                //   onChangeText={text => {
                //     setFirst_name(text);
                //   }}
              />
            </View>
            <View>
              <Text style={styles.smallTxt}>Amount</Text>

              <CustomInput
                placeholder={'Price'}
                keyboardType={'numeric'}
                style={{backgroundColor: Colors.primary.sub, width: 160}}
                //   value={last_name}
                //   onChangeText={text => {
                //     setLast_name(text);
                //   }}
              />
            </View>
          </View>

          <View>
            <Text style={[styles.smallTxt, {marginTop: 10}]}>Revisions</Text>
            <CustomInput
              placeholder={'Optional'}
              keyboardType={'numeric'}
              style={{backgroundColor: Colors.primary.sub, width: 160}}
              //   value={last_name}
              //   onChangeText={text => {
              //     setLast_name(text);
              //   }}
            />
          </View>

          <CustomBtn
            lbl={'Send Proposal'}
            style={{marginTop: 20, marginBottom: 60}}
            // onPress={handleUpdate}
            // loading={updateMutation.isPending}
          />
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

  skillContainer: {
    backgroundColor: Colors.primary.sub,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginRight: 10,
    marginTop: 5,
  },
  postBox: {
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    borderColor: Colors.primary.darkgray,
  },
  cardImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  txt: {
    color: Colors.primary.darkgray,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'justify',
  },
});

export default SendProposal;
