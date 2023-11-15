/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import Geolocation from '@react-native-community/geolocation';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native'; // Import Text component
import MapView, { Marker, Polyline } from 'react-native-maps';
import { openSettings } from 'react-native-permissions';
import COLORS from '../../../assets/Colors/colors';
import IMAGES from '../../../assets/images';
import { CustomBottomButton } from '../../../components/CustomBottomButton';
import { TextView } from '../../../components/TextView';
import { useAdvertisementTrackMutation } from '../../../redux/query/AdvertisementTrack/AdvertisementTrackApi';
import {
  IAdvertisementTrack,
  IAdvertisementTrackResponse,
} from '../../../redux/query/AdvertisementTrack/type';
import { RootParamList } from '../../../routes/RootStackType';
import { requestLocationPermission } from '../../../services/geolocation-services';
import { showErrorToast } from '../../../utils/Toasts';
import styles from './Styles';
import {useSessionExpire} from '../../../hooks/UseSessionExpire';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NavigationProp<RootParamList, 'AdvertisementDetailScreen'> & {
    replace: (name: keyof RootParamList, params?: object) => void;
  };
  route: RouteProp<RootParamList, 'AdvertisementDetailScreen'>;
};
const latitudeDelta = 0.0300;
const longitudeDelta = 0.0421;
const AdvertisementDetailScreen = (props: Props) => {
  const { navigation, route } = props;
  const { advertisementDetails } = route.params;
  const mapRef = useRef<MapView | null>(null);
  StatusBar.setBarStyle('dark-content');
  const [advertisementTrack] = useAdvertisementTrackMutation();
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState<any>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });

  const handleSessionExpired = () => {
    AsyncStorage.clear();
    navigation.replace('UnAuthenticatedStack');
  };

  const [trackCoordinates, setTrackCoordinates] = useState<
    IAdvertisementTrack[]
  >([]);
  const [polygonShowList, setPolygonShowList] = useState<
  IAdvertisementTrack[]
>([]);


  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const startTracking = () => {
    setIsTracking(true);
    getMovingLocation();
  };

  const stopTracking = () => {
    if (trackCoordinates.length > 0 && trackCoordinates.length < 20) {
      handleTrackApi(trackCoordinates);
    }
    setIsTracking(false);
    getCurrentLocation();
    if (watchId) {
      Geolocation.clearWatch(watchId);
    }
    setTrackCoordinates([]);
  };

  const handleTrackApi = (prevLocations: IAdvertisementTrack[]) => {
    advertisementTrack({
      advertisement_id: advertisementDetails.id,
      json: JSON.stringify(prevLocations),
    })
      .unwrap()
      .then((res: IAdvertisementTrackResponse) => {
        if (res.status) {
          console.log(res);
           setTrackCoordinates([]);
        }
      })
      .catch(error => {
        console.log(error);
        showErrorToast(error?.data?.message);
        if (error.status === 401) {
          console.log('session@@@#####', error);
          useSessionExpire({
            handleOnPress: handleSessionExpired,
            sessionExpire: true,
          });
        }
      });
  };

  const getMovingLocation = async () => {
    const result = await requestLocationPermission();
    if (result === 'granted') {
      const id = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          if (isTracking) {
          setPolygonShowList(prevCoordinates=>{
            return [...prevCoordinates,{latitude, longitude}];
          });
            setTrackCoordinates(prevCoordinates => {
              if (prevCoordinates.length === 20) {
                handleTrackApi(prevCoordinates);
              }
              return [
                ...prevCoordinates,
                { latitude, longitude, timestamp: Date.now() },
              ];
            });
          }
          setMapRegion({
            latitude,
            longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          });
        },
        error => {
          handleErrorLocation(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 1,
        },
      );
      setWatchId(id);
    } else {
      openSettings();
      Alert.alert('No Permission');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        });
      },
      error => {
        handleErrorLocation(error);
      },
      {
        enableHighAccuracy: Platform.OS === 'android' ? false : true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1,
      },
    );
  };

  const handleErrorLocation = (error: any) =>{
    if (error.code === 1) {
      console.log(
        'Permission denied. Make sure location permissions are granted.',
      );
    } else if (error.code === 2) {
      console.log(
        'Position unavailable. Check GPS signal and network connectivity.',
      );
    } else if (error.code === 3) {
      console.log('Timeout. The location request timed out.');
    } else {
      console.log('Location request failed with an unknown error.');
    }
   };
  useEffect(() => {
    getCurrentLocation();
    if (isTracking) {
      getMovingLocation();
    }
    return () => {
      setTrackCoordinates([]);
    };
  }, [isTracking]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView
            ref={map => {
              mapRef.current = map;
            }}
            style={styles.map}
            zoomEnabled
            showsCompass={false}
            region={mapRegion}>
            <Marker
              coordinate={{
                latitude: mapRegion?.latitude,
                longitude: mapRegion?.longitude,
              }}>
              <Image
                source={IMAGES.polygon_line}
                resizeMode="contain"
                style={styles.polygonImage}
              />
            </Marker>
            <Polyline
              coordinates={polygonShowList}
              strokeWidth={6}
              strokeColor={COLORS.parentColor}
            />
          </MapView>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Image source={IMAGES.icon_back} resizeMode="contain" />
          </TouchableOpacity>
          <View style={styles.advertisementDetailView}>
            <TextView
              text={advertisementDetails?.name}
              style={styles.advertisementTitle}
            />
            <TextView
              text={advertisementDetails?.description}
              style={styles.advertisementDescription}
            />
          </View>
          <TouchableOpacity style={styles.footer}>
            <CustomBottomButton
              startTrip={isTracking}
              onPress={isTracking ? stopTracking : startTracking}
              style={styles.footerText}
              text={isTracking ? 'STOP' : 'START'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdvertisementDetailScreen;
