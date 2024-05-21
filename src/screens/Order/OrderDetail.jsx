import React from 'react';
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
} from 'react-native';
import {Colors} from '../../constants/theme';
import SmallCard from '../../components/SmallCard';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import apiRequest from '../../api/apiRequest';
import urlType from '../../constants/UrlConstants';  
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBtn from '../../components/CustomBtn';
import LargeCard from '../../components/LargeCard';

function OrderDetail({route, navigation}) {
    const {contract_id} = route.params;
  const contractData = useQuery({
    queryKey: ['contractData'],
    queryFn: async () => {
      const response = await apiRequest(urlType.BACKEND, {
        method: 'get',
        url: `contract?contract_id=${contract_id}`,
      });
      return response.data;
    },
  });
  console.log("first", contractData.data)
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={32}
            color={Colors.primary.lightBlack}
          />
        </TouchableOpacity>
        <Text style={[styles.largeTxt]}>Order Details</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="clipboard-remove-outline"
            size={32}
            color={Colors.primary.red}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 20, marginBottom: 40}}>
        <Text style={[styles.largeTxt,{fontSize: 18}]}>Job Post</Text>
        {/* {userData.data && userData.data.length > 0 ? (
          <FlatList
            data={userData.data}
            refreshControl={
              <RefreshControl
                refreshing={userData.isLoading}
                onRefresh={() => userData.refetch()}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item: jobData, index}) => (
              <LargeCard
                key={index}
                jobData={jobData?.job}
                postId={jobData?.job?.job_id}
              />
            )}
          />
        ) : (
          <View style={{alignItems: 'center', marginTop: 10}}>
            {userData.data ? (
              <Text style={{color: Colors.primary.lightGray}}>
                No posts available
              </Text>
            ) : (
              <ActivityIndicator size={24} color={Colors.primary.black} />
            )}
          </View>
        )} */}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
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

export default OrderDetail;
