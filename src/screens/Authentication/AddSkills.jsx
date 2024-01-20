import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import gImg from '../../assets/Images/google-img.png';
import {Picker} from '@react-native-picker/picker';
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';
import CustomRadioBtn from '../../components/CustomRadioBtn';
import {Colors} from '../../constants/theme';
import {useQuery, useMutation} from '@tanstack/react-query';
import apiRequest from '../../api/apiRequest';
import urlType from '../../constants/UrlConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {DropdownMultiselectView} from 'react-native-dropdown-multiselect';
import OutlinedChip from '../../components/OutlinedChip';

const AddSkills = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [user_name, setUser_name] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedItem, setSelectedItem] = useState([]);

  const getUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem('@user');
      return JSON.parse(userString);
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };
  
  // Example of how to use the async function
  const fetchData = async () => {
    const user = await getUserData();
  
    if (user) {
      console.log("hello",user); // Complete user object
      // console.log("hello2",user.user_account.user_id); // Accessing nested property
      console.log("hello3",user.first_name);
      console.log(user.last_name);
      console.log(user.role_id);
      console.log(user.role.name);
    }
  };
  fetchData()

  const data = [
    {key: 1, value: 'orange'},
    {key: 2, value: 'apple'},
    {key: 3, value: 'banana'},
  ];

  const handleSelect = option => {
    setSelectedGender(option);
  };

  // console.log(account)

  const signupMutation = useMutation({
    mutationFn: async data => {
      const response = await apiRequest(urlType.BACKEND, {
        method: 'post',
        url: `signup`,
        data,
      });
      // console.log(response);
      return response;
    },
    onSuccess: async e => {
      if (e.status === 200) {
        await AsyncStorage.setItem('@user', JSON.stringify(e.data.user));
        await AsyncStorage.setItem('@auth_token', e.data.token);
        navigation.navigate('BottomNavigation');
      } else if (e.response.status === 404) {
        showMessage({
          message: e.response.message,
          type: 'danger',
          color: '#fff',
          backgroundColor: 'red',
          floating: true,
        });
      } else {
        showMessage({
          message: e.response.message || 'An Error occured',
          type: 'danger',
          color: '#fff',
          backgroundColor: 'red',
          floating: true,
        });
      }
    },
  });

  const handleSignup = async () => {
    var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordFormat =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    // const password = 'SecurePassword123!';
    // const isValid = passwordFormat.test(password);

    // if (isValid) {
    //   console.log('Valid password');
    // } else {
    //   console.log('Invalid password');
    // }
    if (
      email.length > 0 &&
      user_name.length > 0 &&
      first_name.length > 0 &&
      last_name.length > 0 &&
      selectedGender.length > 0 &&
      password.length > 0 &&
      account > 0 &&
      password === confirmPassword
    ) {
      if (email.match(emailFormat)) {
        const data = {
          user_name: user_name,
          email: email,
          password: password,
          first_name: first_name,
          last_name: last_name,
          gender: selectedGender,
          role_id: parseInt(account),
        };
        await signupMutation.mutate(data);
        // console.log(loginMutation.isLoading);
        console.log(data);
      } else {
        showMessage({
          message: 'Invalid Email Format',
          type: 'danger',
          color: '#fff',
          backgroundColor: 'red',
          floating: true,
        });
      }
    } else if (password !== confirmPassword) {
      showMessage({
        message: 'Password does not match',
        type: 'danger',
        color: '#fff',
        backgroundColor: 'red',
        floating: true,
      });
    } else {
      showMessage({
        message: 'Please fill all the fields',
        type: 'danger',
        color: '#fff',
        backgroundColor: 'red',
        floating: true,
      });
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.headContainer}>
          <View>
            <Text style={styles.heading}>Register Account</Text>
            <Text style={styles.text}>Fill your details or continue</Text>
            <Text style={styles.text}>with google</Text>
          </View>
        </View>
        {/* <CustomInput
          isIcon={true}
          isIconName={'account-outline'}
          placeholder="User Name"
          keyboardType="default"
          value={user_name}
          onChangeText={text => {
            setUser_name(text);
          }}
        /> */}
        <View style={{color: '#000'}}>
          {/* <DropdownMultiselectView
            data={data}
            displayKey="value"
            displayValue="key"
            selectedItem={selectedItem}
            optionsContainer={{backgroundColor: 'grey'}}
            selectContainer={{backgroundColor: 'red', color: 'black'}}
            itemContainer={{backgroundColor: 'yellow', color: 'black'}}
            setSelectedItem={selectedItems => {
              console.log('Selected Items:', selectedItems);
              setSelectedItem(selectedItems);
            }}
          /> */}
          <DropdownMultiselectView
          optionsContainer={styles.text}
            data={data}
            displayKey="value"
            displayValue="key"
            selectedItem={selectedItem}
            setSelectedItem={selectedItems => {
              console.log('Selected Items:', selectedItems);
              setSelectedItem(selectedItems);
            }}
          />
          {/* <Text>Selected Items: {JSON.stringify(selectedItem.values)}</Text>
          <SelectedItems
            selectedItems={selectedItem}
            onRemoveItem={itemToRemove => {
              const updatedItems = selectedItem.filter(
                item => item.key !== itemToRemove.key,
              );
              setSelectedItem(updatedItems);
            }}
          /> */}

          <View style={styles.chipWrapper}>
            {selectedItem.map(item => (
              <OutlinedChip
                key={item.key}
                label={item.value}
                onDelete={() => {
                  // Remove the item from selected items
                  const updatedItems = selectedItem.filter(
                    selected => selected.key !== item.key,
                  );
                  setSelectedItem(updatedItems);
                }}
              />
            ))}
          </View>
        </View>

        <CustomBtn
          lbl={'sign up'}
          style={{marginTop: 80}}
          //   onPress={handleSignup}
          // loading={loginMutation.isPending}
          onPress={() => navigation.navigate('BottomNavigation')}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.sub,
    padding: 30,
  },
  headContainer: {
    // marginRight: 180,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#636363',
  },
  inputField: {
    backgroundColor: '#fff',
    color: '#636363',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  chipWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  line: {
    height: 1,
    width: 50,
    backgroundColor: '#636363',
    marginHorizontal: 10,
  },
  gBtn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 14,
    backgroundColor: '#fff',
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
export default AddSkills;
