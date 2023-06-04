/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainNav from './src/navigation/MainNav';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {setupStore} from './src/redux/store';
import {NativeBaseProvider} from 'native-base';

const store = setupStore();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
