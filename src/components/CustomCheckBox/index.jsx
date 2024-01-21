import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You may need to install the library
import { Colors } from '../../constants/theme';

const CustomCheckBox = ({ label, onChange, isChecked }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <View style={styles.checkbox}>
        {isChecked ? (
          <Icon name="check-square-o" size={20} color="green" />
        ) : (
          <Icon name="square-o" size={20} color="gray" />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: Colors.primary.lightBlack,
    fontWeight: '500'
  },
});

export default CustomCheckBox;
