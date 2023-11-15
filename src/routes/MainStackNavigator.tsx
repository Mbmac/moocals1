import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ForgotPasswordScreen from '../containers/auth/ForgotPassword/ForgotPassword';
import LoginScreen from '../containers/auth/Login/LoginScreen';
import Register from '../containers/auth/Register/RegisterScreen';
import Splash from '../containers/auth/Splash/SplashScreen';
import AdvertisementDetailScreen from '../containers/home/AdvertisementDetail/AdvertisementDetailScreen';
import AdvertisementScreen from '../containers/home/AdvertisementScreen/AdvertisementScreen';
import ProfileScreen from '../containers/home/ProfileScreen/ProfileScreen';

export const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="authenticated"
        component={AuthenticatedStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UnAuthenticatedStack"
        component={UnAuthenticatedStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const UnAuthenticatedStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdvertisementDetailScreen"
        component={AdvertisementDetailScreen as never}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const AuthenticatedStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdvertisementScreen"
        component={AdvertisementScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdvertisementDetailScreen"
        component={AdvertisementDetailScreen as never}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
