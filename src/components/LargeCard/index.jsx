import React, {useState} from 'react';
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
import CustomModal from '../CustomModal';
import {useQuery, useMutation} from '@tanstack/react-query';
import apiRequest from '../../api/apiRequest';
import urlType from '../../constants/UrlConstants';
import {showMessage} from 'react-native-flash-message';
import onShare from '../../constants/onShare';

function LargeCard({jobData, isMyPost, postId, handleUpdate, userData}) {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async id => {
      const response = await apiRequest(urlType.BACKEND, {
        method: 'delete',
        url: `job?job_id=${id}`,
      });
      return response;
    },
    onSuccess: async e => {
      if (e.status === 200) {
        showMessage({
          message: e.message,
          type: 'success',
          color: '#fff',
          backgroundColor: Colors.primary.green,
          floating: true,
        });
        userData.refetch();
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
  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    await deleteMutation.mutate(postId);
    setDeleteModalVisible(false);
  };

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
        {isMyPost ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={{marginRight: 10}} onPress={handleUpdate}>
              <MaterialCommunityIcons
                name="book-edit-outline"
                size={24}
                color={Colors.primary.darkgray}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <MaterialCommunityIcons
                name="delete-outline"
                size={24}
                color={Colors.primary.red}
              />
            </TouchableOpacity>
            <CustomModal
              visible={isDeleteModalVisible}
              onClose={() => setDeleteModalVisible(false)}
              onAction={confirmDelete}
              action="Delete"
              message="Are you sure you want to delete this post?"
            />
          </View>
        ) : (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color={Colors.primary.darkgray}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.txt}>{jobData?.job_description}</Text>
      </View>
      <View style={{marginTop: 10}}>
        {jobData?.image ? (
          <Image
            source={{uri: jobData?.image}}
            style={{width: 'auto', height: 400, resizeMode: 'contain'}}
          />
        ) : null}
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
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => onShare("text")}>
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
