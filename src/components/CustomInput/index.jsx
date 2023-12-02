import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CustomInput({
  placeholder,
  keyboardType,
  onBlur,
  onChange,
  onChangeText,
  multiline,
  editable,
  scrollEnabled,
  value,
  // isIcon,
  secureTextEntry,
  isPasswordIcon,
  isIconName,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View>
      {/* <View> {lbl ? <Text style={styles.styleTxt}>{lbl}</Text> : null}</View> */}

      <View style={styles.innerContainer}>
        <MaterialCommunityIcons name={isIconName} size={20} color="#636363" />

        <TextInput
          style={styles.styleInput}
          placeholderTextColor="#636363"
          placeholderStyle={{color: 'red'}}
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChangeText}
          onChange={onChange}
          value={value}
          secureTextEntry={secureTextEntry && isPasswordVisible}
          multiline={multiline}
          editable={editable}
          scrollEnabled={scrollEnabled}
          keyboardType={keyboardType}
        />
        {isPasswordIcon ? (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialCommunityIcons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#636363"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingRight: 30,
    paddingLeft: 10,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 12,
  },
  styleTxt: {},
  styleInput: {
    width: '94%',
    backgroundColor: '#fff',
    color: '#636363',
    padding: 5,
    paddingHorizontal: 10,
  },
});

export default CustomInput;
