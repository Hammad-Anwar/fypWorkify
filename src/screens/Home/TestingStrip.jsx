import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Button,
  Alert,
} from 'react-native';
import {Colors} from '../../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQuery, useMutation} from '@tanstack/react-query';
import apiRequest from '../../api/apiRequest';
import urlType from '../../constants/UrlConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {useStripe} from '@stripe/stripe-react-native';

function TestingStrip({route, navigation}) {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await apiRequest(`http://192.168.100.34:5000/api/`, {
      method: 'POST',
      url: 'payment-sheet',
    });
    const {paymentIntent, ephemeralKey, customer} = await response;
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  const payoutAp = async () => {
    const response = await apiRequest(`http://192.168.100.34:5000/api/`, {
      method: 'POST',
      url: 'payout',
      data: {
        sellerId: 'acct_1PPrgyGan2gBV4LM',
        amount: 5,
      },
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
    });
    console.log('firstsss', response);
    // const { paymentIntent, ephemeralKey, customer} = await response;
    // console.log("ddd", paymentIntent, ephemeralKey, customer)
    return {
      response,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    // see below
    const {error} = await presentPaymentSheet();
    console.log('first', error);

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  const openpayout = async () => {
    const py = await payoutAp();
    console.log('first', py);
  };
  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={[styles.row]}>
          <TouchableOpacity
            style={{marginRight: '28%'}}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={Colors.primary.lightBlack}
            />
          </TouchableOpacity>
          <Text style={[styles.largeTxt]}>Testing</Text>
        </View>

        <View>
          <Button
            variant="primary"
            disabled={!loading}
            title="Checkout"
            onPress={openPaymentSheet}
          />
          <Button
            variant="primary"
            disabled={!loading}
            title="Payout"
            onPress={openpayout}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  imgStyle: {
    width: 82,
    height: 82,
    borderRadius: 55,
    marginTop: 20,
    marginBottom: 10,
  },
  //   scrollContent: {
  //     flexGrow: 1,
  //   },
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
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.lightBlack,
  },
  line: {
    marginVertical: 20,
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary.lightGray,
  },
});

export default TestingStrip;
