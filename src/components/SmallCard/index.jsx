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

function SmallCard() {
  return (
    // <View style={styles.container}>
      <View style={[styles.smallCard]}>
        <View style={styles.row}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={profileImg} style={styles.cardImg} />
            <Text style={[styles.smallTxt, {marginLeft: 5}]}>John William</Text>
          </View>
          <MaterialIcons name="star" size={20} color={Colors.primary.main} />
        </View>
        <View style={[styles.row, {marginTop: 10}]}>
          <Text style={[styles.smallTxt, {width: '70%'}]}>
            Create web page design on figma for freelancing web sites...........{' '}
          </Text>
          <Text style={[styles.smallTxt, {fontWeight: '600'}]}>$90</Text>
        </View>
      </View>
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
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
});

export default SmallCard;
