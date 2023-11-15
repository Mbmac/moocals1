import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AdvertisementListData} from '../redux/query/AdvertisementList/type';

export type RootParamList = {
  Splash: undefined;
  Login: undefined;
  authenticated: undefined;
  UnAuthenticatedStack: undefined;
  AdvertisementDetailScreen: {advertisementDetails: AdvertisementListData};
  ForgotPassword: undefined;
  Register: undefined;
  ProfileScreen: undefined;
  AdvertisementScreen: undefined;
  sessionStorage: undefined;
};

export type RootStackNavigationProps<T extends keyof RootParamList> = {
  navigation: NavigationProp<RootParamList, T>;
  route: RouteProp<RootParamList, T>;
};
