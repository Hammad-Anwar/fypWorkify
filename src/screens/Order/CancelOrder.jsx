import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import apiRequest from '../../api/apiRequest';
import urlType from '../../constants/UrlConstants';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
function CancelOrder({navigation, route}) {
  const {contract} = route.params;
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user']);
  const [messageRequest, setMessageRequest] = useState('');

  const contractData = useQuery({
    queryKey: ['contractCancelData', contract?.contract_id],
    queryFn: async () => {
      const response = await apiRequest(urlType.BACKEND, {
        method: 'get',
        url: `contract?contract_id=${contract?.contract_id}`,
      });
      return response.data;
    },
    enabled: contract?.contract_id ? true : false,
  });

  const cancelContractMutation = useMutation({
    mutationKey: ['cancelContractReq'],
    mutationFn: async data => {
      const response = await apiRequest(urlType.BACKEND, {
        method: 'post',
        url: `cancelContractReq`,
        data,
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
        contractData.refetch();
        setMessageRequest('');
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

  const handleSubmit = async () => {
    if (messageRequest.length > 0) {
      const data = {
        contract_id: parseInt(contractData?.data?.contract_id),
        user_id: parseInt(userData?.user?.useraccount_id),
        message: messageRequest,
      };
      await cancelContractMutation.mutate(data);
    } else {
      showMessage({
        message: 'Please Fill the Input Field',
        type: 'danger',
        color: '#fff',
        backgroundColor: 'red',
        floating: true,
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row, {marginBottom: 20}]}>
        <TouchableOpacity
          style={{marginRight: '18%'}}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={32}
            color={Colors.primary.lightBlack}
          />
        </TouchableOpacity>
        <Text style={styles.largeTxt}>Cancel Order Request</Text>
      </View>

      {contractData?.data?.cancel_contract &&
      contractData?.data?.cancel_contract.length > 0 ? (
        <FlatList
          data={contractData?.data?.cancel_contract}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={complainData?.data?.isLoading}
          //     onRefresh={() => complainData?.data?.refetch()}
          //   />
          // }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item: data, index}) => (
            <>
              {data?.user_id === userData?.user?.useraccount_id ? (
                <View style={{alignItems: 'flex-end'}}>
                  <View
                    key={index}
                    style={{
                      width: '80%',
                      marginTop: 10,
                      backgroundColor: Colors.primary.lightGray,
                      paddingLeft: 20,
                      paddingRight: 10,
                      paddingTop: 10,
                      borderRadius: 12,
                    }}>
                    <Text style={[styles.smallTxt]}>{data?.message}</Text>
                    <Text
                      style={[
                        styles.smallTxt,
                        {textAlign: 'right', fontSize: 12, marginBottom: 5},
                      ]}>
                      Send By You
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{alignItems: 'flex-start'}}>
                  <View
                    key={index}
                    style={{
                      width: '80%',
                      marginTop: 10,
                      backgroundColor: Colors.primary.lightGray,
                      paddingLeft: 20,
                      paddingRight: 10,
                      paddingTop: 10,
                      borderRadius: 12,
                    }}>
                    <Text style={[styles.smallTxt]}>{data?.message}</Text>
                    <Text
                      style={[
                        styles.smallTxt,
                        {textAlign: 'right', fontSize: 12, marginBottom: 5},
                      ]}>
                      Send By Admin
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
          ListHeaderComponent={<></>}
          ListFooterComponent={
            <>
              <View style={{marginBottom: 40}}></View>
            </>
          }
        />
      ) : (
        <View style={{alignItems: 'center', marginTop: 10}}>
          {contractData?.data?.cancel_contract ? (
            <Text style={{color: Colors.primary.lightGray}}>
              No cancellation requests have been sent.
            </Text>
          ) : (
            <ActivityIndicator size={24} color={Colors.primary.black} />
          )}
        </View>
      )}

      <View style={styles.line}></View>

      <CustomInput
        placeholder="Write the reason of order cancel."
        keyboardType="default"
        multiline={true}
        numberOfLines={3}
        style={{
          backgroundColor: Colors.primary.sub,
        }}
        value={messageRequest}
        onChangeText={text => {
          setMessageRequest(text);
        }}
      />

      <View style={{marginTop: 20, marginBottom: 10}}>
        <CustomBtn
          lbl="Request Send"
          onPress={handleSubmit}
          loading={cancelContractMutation.isPending}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 20,
    paddingTop: 10,
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
    fontWeight: '500',
    color: Colors.primary.darkgray,
  },
  line: {
    marginVertical: 20,
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary.lightGray,
  },
  imgStyle: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
});

export default CancelOrder;
