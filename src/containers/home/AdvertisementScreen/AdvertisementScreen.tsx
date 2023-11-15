/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StatusBar,
  Platform,
  Alert,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IMAGES from '../../../assets/images';
import {TextView} from '../../../components/TextView';
import {useAdvertisementListMutation} from '../../../redux/query/AdvertisementList/AdvertisementListApi';
import {
  AdvertisementListData,
  IAdvertisementListResponse,
} from '../../../redux/query/AdvertisementList/type';
import {setAdvertisementList} from '../../../redux/slices/AdvertisementSlice';
import {RootState} from '../../../redux/store';
import {RootParamList} from '../../../routes/RootStackType';
import ENDPOINTS from '../../../services/EndPoints';
import Constant from '../../../translation/Constants';
import {showErrorToast} from '../../../utils/Toasts';
import styles from './Styles';
import {useProfileMutation} from '../../../redux/query/profile/ProfileApi';
import {setUserData} from '../../../redux/slices/userSlice';
import {requestLocationPermission} from '../../../services/geolocation-services';
import {openSettings} from 'react-native-permissions';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
import {useSessionExpire} from '../../../hooks/UseSessionExpire';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NavigationProp<RootParamList, 'sessionStorage'> & {
    replace: (name: keyof RootParamList, params?: object) => void;
  };
};

const AdvertisementScreen = (props: Props) => {
  StatusBar.setBarStyle('default');
  const {navigation} = props;

  const handleSessionExpired = () => {
    AsyncStorage.clear();
    navigation.replace('UnAuthenticatedStack');
  };

  const [profile] = useProfileMutation();
  const dispatch = useDispatch();
  const {userData} = useSelector((state: RootState) => state.user);
  const [advertisementList, {data, isLoading}] = useAdvertisementListMutation();
  const {list} = useSelector((state: RootState) => state.advertisement);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    advertisementList({page: currentPage})
      .unwrap()
      .then((res: IAdvertisementListResponse) => {
        if (res.status) {
          dispatch(setAdvertisementList(res.data.list as never));
        }
      })
      .catch(async error => {
        if (error.status === 401) {
          useSessionExpire({
            handleOnPress: handleSessionExpired,
            sessionExpire: true,
          });
        }
      });
  }, []);

  React.useEffect(() => {
    profile()
      .unwrap()
      .then(res => {
        console.log('resprofile', res);
        if (res.status) {
          dispatch(setUserData(res.data));
        }
      });
  }, [navigation]);
  const handleProfileClick = () => {
    navigation.navigate('ProfileScreen' as never);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    advertisementList({page: 1})
      .unwrap()
      .then((res: IAdvertisementListResponse) => {
        if (res.status) {
          dispatch(setAdvertisementList(res.data.list as never));
          setCurrentPage(1);
        }
      })
      .catch(error => {
        console.log('@@handleRefreshApi--', JSON.stringify(error));
        if (error.status === 401) {
          useSessionExpire({
            handleOnPress: handleSessionExpired,
            sessionExpire: true,
          });
        }
        showErrorToast(error?.data?.message);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  const handleItemNavigationClick = (item: any) => {
    navigation.navigate('AdvertisementDetailScreen', {
      advertisementDetails: item,
    });
  };

  const handleItemClick = async (item: any) => {
    const result = await requestLocationPermission();
    if (result === 'granted') {
      if (Platform.OS === 'android') {
        const androidDeviceLocation = await isLocationEnabled();
        if (androidDeviceLocation) {
          handleItemNavigationClick(item);
        } else {
          await promptForEnableLocationIfNeeded().then(res => {
            if (res === 'enabled') {
              handleItemNavigationClick(item);
            }
          });
        }
      }
      if (Platform.OS === 'ios') {
        handleItemNavigationClick(item);
      }
    }
    if (result === 'blocked') {
      Alert.alert(
        'Permission Required',
        'Please grant location to use this feature.',
        [
          {
            text: 'OK',
            onPress: () => {
              openSettings();
            },
          },
        ],
      );
    }
  };

  const renderItem = ({item}: {item: AdvertisementListData}) => (
    <View style={styles.renderView}>
      <TouchableOpacity
        onPress={async () => handleItemClick(item)}
        style={styles.item}>
        <View style={styles.listImageView}>
          <Image
            style={styles.renderImageStyle}
            source={{uri: ENDPOINTS.API_IMAGE_URL + item.image}}
          />
        </View>
        <View style={styles.centerSection}>
          <TextView style={styles.title} text={item.name} />
          <TextView style={styles.descriptionText} text={item.description} />
        </View>
      </TouchableOpacity>
      <View style={styles.listDividerLine} />
    </View>
  );

  const handlePagination = () => {
    if (!isLoadingMore && data?.data?.next_page_url) {
      setIsLoadingMore(true);
      setCurrentPage(currentPage + 1);

      advertisementList({page: currentPage + 1})
        .unwrap()
        .then((res: IAdvertisementListResponse) => {
          if (res.status) {
            dispatch(
              setAdvertisementList([...list, ...(res.data.list as never)]),
            );
          }
        })
        .catch(error => {
          showErrorToast(error?.data?.message);
        })
        .finally(() => {
          setIsLoadingMore(false);
        });
    }
  };
  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyView}>
        <TextView text={'No data found'} style={styles.emptyText} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackgroundStyle}
        source={IMAGES.advertisementBackgroundImage}>
        <View style={styles.titleViewStyle}>
          <TextView text={Constant.advertisement} style={styles.headerText} />
          <View style={styles.profileSectionView}>
            <TouchableOpacity
              onPress={handleProfileClick}
              style={styles.profileView}>
              {userData?.profile_image ? (
                <Image
                  style={styles.profileIcon}
                  source={{uri: userData?.profile_image}}
                />
              ) : (
                <Image
                  style={styles.profileIcon}
                  source={IMAGES.profile_dummy_image}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.advertisementListView}>
        {list.length === 0 ? (
          ListEmptyComponent()
        ) : (
          <FlatList
            data={list}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            onEndReached={handlePagination}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => {
              return isLoading ? (
                <ActivityIndicator size={30} color={'#1A362E'} />
              ) : null;
            }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => handleRefresh()}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default AdvertisementScreen;
