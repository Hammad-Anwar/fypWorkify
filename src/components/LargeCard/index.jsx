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

function LargeCard() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.row, {justifyContent: 'flex-start'}]}>
          <Image source={profileImg} style={styles.cardImg} />
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
              John William
            </Text>
            <Text style={[styles.txt]}>
              4 hr | <>Softwar Engineer</>{' '}
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
        <Text style={styles.txt}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </View>
      <View style={[styles.row, {justifyContent: 'flex-start', marginTop: 10}]}>
        <Text style={styles.txt}>Payment: </Text>
        <Text
          style={[
            styles.txt,
            {color: Colors.primary.lightBlack, fontWeight: '600'},
          ]}>
          $200
        </Text>
      </View>
      <View style={[styles.row, {justifyContent: 'flex-start'}]}>
        <Text style={styles.txt}>Duration: </Text>
        <Text
          style={[
            styles.txt,
            {color: Colors.primary.lightBlack, fontWeight: '600'},
          ]}>
           4th-6th Weeks
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
