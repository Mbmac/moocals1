// import Geolocation, {
//   GeolocationResponse,
// } from '@react-native-community/geolocation';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE ||
          PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION ||
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    const status = await request(permission);
    return status;
  } catch (error) {
    console.error('Error requesting location permission:', error);
  }
};

// export const getCurrentLocation = (
//   enableHighAccuracy?: boolean,
// ): Promise<GeolocationResponse | undefined> => {
//   return new Promise(resolve => {
//     Geolocation.getCurrentPosition(
//       position => resolve(position),
//       () => resolve(undefined),
//       {enableHighAccuracy: enableHighAccuracy},
//     );
//   });
// };
