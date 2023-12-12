import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/theme'
import SmallCard from '../../components/SmallCard';


function OtherReview() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.line}></View>
        <Text style={{color: Colors.primary.darkgray, marginBottom: 10}}>*Reviews given by you. </Text>
        <SmallCard profile={true} />
        <SmallCard profile={true} />
        <SmallCard profile={true} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.white,
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

export default OtherReview