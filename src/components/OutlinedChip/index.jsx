import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OutlinedChip = ({ label, onDelete }) => {
    return (
      <View style={styles.chipContainer}>
        <Text style={styles.chipText}>{label}</Text>
        <Text style={styles.deleteIcon} onPress={onDelete}>
          ❌
        </Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    
    chipContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      margin: 5,
    },
    chipText: {
      marginRight: 5,
    },
    deleteIcon: {
      color: 'red',
    },
  });
export default OutlinedChip;
