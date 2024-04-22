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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import profileImg from '../../assets/Images/profileImg.jpg';
import {Colors} from '../../constants/theme';

function SmallCard({
  profile,
  jobData,
  dispute,
  onPress,
  complain_title,
  complain_msg,
  time,
  isOffer,
  profile_image,
  first_name,
  last_name,
  proposal_description,
  proposal_duration,
  proposal_payment,
  proposal_revision,
  proposal_status,
}) {
  return (
    <>
      {profile ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.primary.sub,
            borderRadius: 12,
            padding: 10,
            marginBottom: 10,
          }}>
          <View style={styles.row}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={profileImg} style={styles.cardImg} />
              <Text
                style={[styles.smallTxt, {marginLeft: 5, fontWeight: '600'}]}>
                John William |
              </Text>
              <Text style={[styles.smallTxt, {marginLeft: 5}]}>React js</Text>
            </View>
            <Text style={[styles.smallTxt, {fontWeight: '600'}]}>4d</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={[styles.smallTxt, {width: '100%'}]}>
              Create web page design on figma for freelancing web sites.
            </Text>
            <View style={[styles.row, {justifyContent: 'flex-end'}]}>
              <Text style={[styles.smallTxt, {fontWeight: '600'}]}>4.5</Text>
              <MaterialIcons
                name="star"
                size={20}
                color={Colors.primary.main}
              />
            </View>
          </View>
        </View>
      ) : dispute ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            borderWidth: 1,
            borderColor: Colors.primary.sub,
            borderRadius: 12,
            padding: 10,
            marginBottom: 10,
          }}>
          <View style={styles.row}>
            <Text style={[styles.smallTxt, {fontWeight: '600'}]}>
              {complain_title}
            </Text>
            <Text style={[styles.smallTxt, {fontWeight: '600'}]}>{time}</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text
              style={[styles.smallTxt, {width: '100%'}]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {complain_msg}
            </Text>
          </View>
        </TouchableOpacity>
      ) : isOffer ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            borderWidth: 1,
            borderColor: Colors.primary.sub,
            borderRadius: 12,
            padding: 10,
            marginBottom: 10,
          }}>
          <View style={styles.row}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={profile_image ? {uri: profile_image} : {profileImg}}
                style={styles.cardImg}
              />
              <Text style={[styles.smallTxt, {marginLeft: 5}]}>
                {first_name} {last_name}
              </Text>
            </View>
            <Text style={[styles.smallTxt, {fontWeight: '600'}]}>{time}</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text
              style={[styles.smallTxt, {width: '100%'}]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {proposal_description}
            </Text>
          </View>
          <View style={styles.line}></View>
          <View style={[styles.row, {marginTop: 0}]}>
            <Text style={[styles.smallTxt, {fontWeight: '600'}]}>
              Time: {proposal_duration} days
            </Text>
            <Text style={[styles.smallTxt, {fontWeight: '600'}]}>
              Revision: {proposal_revision}
            </Text>
          </View>

          <View style={{alignItems: 'flex-end', marginTop: 10}}>
            <Text style={[styles.smallTxt, {fontWeight: '600'}]}>
              Price: ${proposal_payment}
            </Text>
          </View>
          <View style={styles.line}></View>
          <View>
            {proposal_status == 'waiting' ? (
              <Text
                style={[
                  styles.smallTxt,
                  {
                    width: '100%',
                    textAlign: 'center',
                    color: Colors.primary.lightGray,
                  },
                ]}>
                Hang tight! Your proposal is being considered by the client.
              </Text>
            ) : proposal_status == 'accept' ? (
              <Text
                style={[
                  styles.smallTxt,
                  {
                    width: '100%',
                    textAlign: 'center',
                    color: Colors.primary.green,
                  },
                ]}>
                Great news! The client has accepted your proposal.
              </Text>
            ) : (
              <Text
                style={[
                  styles.smallTxt,
                  {
                    width: '100%',
                    textAlign: 'center',
                    color: Colors.primary.red,
                  },
                ]}>
                Your proposal was not accepted this time. Keep applying for more
                projects.
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          <View style={[styles.smallCard]}>
            <View style={styles.row}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
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
                <Text style={[styles.smallTxt, {marginLeft: 5}]}>
                  {jobData?.first_name} {jobData?.last_name}
                  {jobData?.client?.first_name} {jobData?.client?.last_name}
                  {jobData?.freelancer?.first_name}{' '}
                  {jobData?.freelancer?.last_name}{' '}
                </Text>
              </View>
              <MaterialIcons
                name="star"
                size={20}
                color={Colors.primary.main}
              />
            </View>
            <View style={[styles.row, {marginTop: 10}]}>
              <Text style={[styles.smallTxt, {width: '70%'}]}>
                {jobData?.job_description}
              </Text>
              <Text style={[styles.smallTxt, {fontWeight: '600'}]}>
                ${jobData?.payment_amount}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  cardImg: {
    width: 24,
    height: 24,
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  smallTxt: {
    fontSize: 14,
    color: Colors.primary.darkgray,
    fontWeight: '400',
  },
  smallCard: {
    flex: 0.2,
    // flexDirection: 'column',
    marginTop: 10,
    backgroundColor: Colors.primary.sub,
    padding: 15,
    borderRadius: 12,
    height: 130,
    width: 350,
    marginRight: 20,
  },
  line: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: Colors.primary.lightGray,
  },
});

export default SmallCard;
