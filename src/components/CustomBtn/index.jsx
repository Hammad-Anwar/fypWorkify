import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Colors } from '../../constants/theme';

function CustomBtn({style, lbl, onPress, disabled, lblStyle}) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.btn, style]}>
        <Text style={[styles.btnText, lblStyle]}>{lbl}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary.main,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary.darkgray,
    textTransform: 'uppercase'
  },
});

export default CustomBtn;
