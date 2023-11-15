import {GeolocationResponse} from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {PermissionStatus} from 'react-native-permissions';
import {
  getCurrentLocation,
  requestLocationPermission,
} from '../services/geolocation-services';

export const useLocation = () => {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>('unavailable');
  const [currentLocation, setCurrentLocation] = useState<GeolocationResponse>();

  useEffect(() => {
    requestLocationPermission().then(status => {
      if (status) {
        setPermissionStatus(status);
      }
    });
  }, []);

  useEffect(() => {
    if (permissionStatus === 'granted') {
      getCurrentLocation().then(setCurrentLocation);
    }
  }, [permissionStatus]);

  return {
    locationPermissionStatus: permissionStatus,
    currentLocation,
  };
};
