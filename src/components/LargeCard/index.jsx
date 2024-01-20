import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import profileImg from '../../assets/Images/profileImg.jpg';

function LargeCard({jobData}) {
  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: 'numeric',
      // minute: 'numeric',
      // second: 'numeric',
      // timeZoneName: 'short',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.row, {justifyContent: 'flex-start'}]}>
          <Image
            // source={profileImg}
            source={
              jobData?.profile_image 
                ? {uri: jobData.profile_image}
                : jobData?.client?.image 
                ? {uri: jobData?.client?.image}
                : jobData?.freelancer?.image 
                ? {uri: jobData?.freelancer?.image}
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
              {jobData?.client?.first_name} {jobData?.client?.last_name}
              {jobData?.freelancer?.first_name} {jobData?.freelancer?.last_name}{' '}
            </Text>
            <Text style={[styles.txt]}>
              {formatDate(jobData?.updated_at)} | <>{jobData?.skill_name}</>{' '}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            color={Colors.primary.darkgray}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.txt}>{jobData?.job_description}</Text>
      </View>
      <View style={{marginTop: 10}}>
        {jobData?.image.length > 0 ? (
          <Image
            source={profileImg}
            //  source={{ uri: jobData?.image }}
            style={{width: 'auto', height: 400, resizeMode: 'contain'}}
          />
        ) : (
          <Text style={styles.txt}>{jobData?.image}</Text>
        )}
      </View>
      <View style={[styles.row, {justifyContent: 'flex-start', marginTop: 10}]}>
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
      <View style={styles.line}></View>
      <View style={[styles.row, {marginTop: 8, paddingHorizontal: 10}]}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="bookmark-outline"
            size={20}
            color={Colors.primary.darkgray}
          />
          <Text style={[styles.txt]}> Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome
            name="send-o"
            size={18}
            color={Colors.primary.darkgray}
          />
          <Text style={[styles.txt]}> Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="share-outline"
            size={20}
            color={Colors.primary.darkgray}
          />
          <Text style={[styles.txt]}> Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary.sub,
    padding: 10,
    marginTop: 10,
  },
  cardImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  smallCard: {
    marginTop: 10,
    backgroundColor: Colors.primary.sub,
    padding: 10,
    borderRadius: 10,
  },
  txt: {
    color: Colors.primary.darkgray,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'justify',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.primary.sub,
    marginTop: 10,
  },
});

export default LargeCard;
