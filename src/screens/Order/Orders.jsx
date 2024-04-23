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

function Orders({navigation}) {
  const queryClient = useQueryClient();
  const sentProposalData = queryClient.getQueryData(['sentProposalData']);
  const receivedProposalData = queryClient.getQueryData([
    'receivedProposalData',
  ]);

  // Extract proposal_id values from sentProposalData and receivedProposalData
  const proposalIds = [
    ...sentProposalData?.map(data => data.proposal_id),
    ...receivedProposalData?.map(data => data.proposal_id),
  ];

  console.log('proposalIds:', proposalIds);
  const contractData = useQuery({
    queryKey: ['contractsByProposalIds'],
    queryFn: async () => {
      const response = await apiRequest(urlType.BACKEND, {
        method: 'get',
        url: `contractsByProposalIds`,
        data: proposalIds,
      });
      return response.data;
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.line}></View>

      <View>
        {contractData.data && contractData.data.length > 0 ? (
          <FlatList
            data={contractData.data}
            refreshControl={
              <RefreshControl
                refreshing={contractData.isLoading}
                onRefresh={() => contractData.refetch()}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item: data, index}) => (
              <SmallCard
                profile_image={data?.proposal?.user_account?.image}
                first_name={data?.proposal?.user_account?.first_name}
                last_name={data?.proposal?.user_account?.last_name}
                proposal_description={data?.proposal?.description}
                proposal_duration={data?.proposal?.duration}
                proposal_revision={data?.proposal?.revisions}
                proposal_payment={data?.proposal?.payment?.payment_amount}
                order_status={data?.contract_status}
                proposal_tasks={data?.proposal?.has_proposal_task}
                time={moment(data?.updated_at).format('DD-MM-YYYY')}
                key={index}
                isOrder={true}

                // onPress={() =>
                //   navigation.navigate('Complain', {
                //     dispute_data: data,
                //   })
                // }
              />
            )}
          />
        ) : (
          <View style={{alignItems: 'center', marginTop: 10}}>
            {contractData.data ? (
              <Text style={{color: Colors.primary.lightGray}}>
                No Offer Available.
              </Text>
            ) : (
              <ActivityIndicator size={24} color={Colors.primary.black} />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
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

export default Orders;
