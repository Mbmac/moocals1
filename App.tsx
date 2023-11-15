import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {store} from './src/redux/store';
import {MainStack} from './src/routes/MainStackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
