import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();
import {GlobalContextProvider} from './src/context/GlobalContextProvider';
// import {NavigationContainer} from '@react-navigation/native';
// import reducer, {initState} from './src/context/reducer';
import Main from './src/Main';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    // <GlobalContextProvider initialState={initState} reducer={reducer}>
    <GlobalContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </QueryClientProvider>
    </GlobalContextProvider>
  );
}
