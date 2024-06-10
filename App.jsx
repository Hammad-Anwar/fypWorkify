import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GlobalContextProvider} from './src/context/GlobalContextProvider';
import reducer, {initState} from './src/context/reducer';
import Main from './src/Main';
import { StripeProvider } from '@stripe/stripe-react-native';
const queryClient = new QueryClient();

export default function App() {
  return (
    // <GlobalContextProvider initialState={initState} reducer={reducer}>

    <GlobalContextProvider initialState={initState} reducer={reducer}>
      <QueryClientProvider client={queryClient}>
        <StripeProvider
          publishableKey="pk_test_51PPmQqK9F79Hh53UdXQpmo2U6aIQelMMTd4DmVAZCubyfcSlIar2w80QsJIKzTttmTsEV72OFuFR6Z1cKiUGohH3005i0T1FT4"
          urlScheme="http://192.168.100.34:5000" // required for 3D Secure and bank redirects
        >
          <Main />
        </StripeProvider>
      </QueryClientProvider>
    </GlobalContextProvider>
  );
}
