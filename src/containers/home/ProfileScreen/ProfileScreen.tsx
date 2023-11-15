/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import IMAGES from '../../../assets/images';
import {CustomBottomButton} from '../../../components/CustomBottomButton';
import {CustomTextInput} from '../../../components/CustomInputText';
import ImageSelector from '../../../components/ImageSelector';
import {TextView} from '../../../components/TextView';
import PasswordOverlay from '../../../modal/PasswordOverlay';
import {useLogoutMutation} from '../../../redux/query/Logout/LogoutApi';
import {ILogoutResponse} from '../../../redux/query/Logout/type';
import {useProfileMutation} from '../../../redux/query/profile/ProfileApi';
import {useUpdateProfileMutation} from '../../../redux/query/updateProfile/UpdateProfileApi';
import {IUpdateProfileResponse} from '../../../redux/query/updateProfile/type';
import {setIsChangePasswordModal} from '../../../redux/slices/modalSlice';
import {
  setIsEditable,
  setUploadedPic,
  setUserData,
} from '../../../redux/slices/userSlice';
import {RootState} from '../../../redux/store';
import {RootParamList} from '../../../routes/RootStackType';
import Constant from '../../../translation/Constants';
import {showErrorToast, showSuccessToast} from '../../../utils/Toasts';
import styles from './Styles';
import CountryCodeInput from '../../../components/CustomCountryCodeInput';
import {useSessionExpire} from '../../../hooks/UseSessionExpire';
import COLORS from '../../../assets/Colors/colors';

type Props = {
  navigation: NavigationProp<RootParamList, 'ProfileScreen'> & {
    replace: (name: keyof RootParamList, params?: object) => void;
  };
};

const ProfileScreen = (props: Props) => {
  const {navigation} = props;
  StatusBar.setBarStyle('dark-content');
  const dispatch = useDispatch();

  const {userData, isEditable, uploadedPic} = useSelector(
    (state: RootState) => state.user,
  );
  const {isChangePasswordModal} = useSelector(
    (state: RootState) => state.modal,
  );
  const handleSessionExpired = () => {
    AsyncStorage.clear();
    navigation.replace('UnAuthenticatedStack');
  };
  const [profile] = useProfileMutation();

  const [logout, {isLoading}] = useLogoutMutation();

  const [updateProfile, {isLoading: updateProfileIsLoading}] =
    useUpdateProfileMutation();

  const [visibleImageModal, setVisibleImageModal] = React.useState(false);

  const handleBackPress = React.useCallback(() => {
    dispatch(setIsEditable(false));
    navigation.goBack();
  }, [navigation]);

  const handleChangePasswordPress = React.useCallback(() => {
    dispatch(setIsChangePasswordModal(!isChangePasswordModal));
  }, []);

  const handleProfilePress = React.useCallback(() => {
    setVisibleImageModal(true);
  }, []);

  const handleEditPress = React.useCallback(() => {
    dispatch(setIsEditable(!isEditable));
  }, []);

  const handleLogoutPress = async () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            showErrorToast('Logout cancelled');
          },
        },
        {
          text: 'Yes',
          onPress: async () => {
            logout()
              .unwrap()
              .then(async (res: ILogoutResponse) => {
                if (res?.status) {
                  await AsyncStorage.clear();
                  showSuccessToast(res?.message);
                  navigation.navigate('UnAuthenticatedStack');
                }
              })
              .catch(err => {
                showErrorToast(err?.error);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append('first_name', userData?.first_name || '');
    formData.append('country_code', userData?.country_code || '');
    formData.append('email', userData?.email || '');
    formData.append('gender', userData?.gender || '');
    formData.append('last_name', userData?.last_name || '');
    formData.append('phone_number', userData?.phone_number || '');
    formData.append(
      'profile_image',
      uploadedPic.name === '' ? '' : uploadedPic,
    );
    updateProfile(formData)
      .unwrap()
      .then((response: IUpdateProfileResponse) => {
        if (response?.status) {
          showSuccessToast(response?.message);
          profile()
            .unwrap()
            .then(res => {
              if (res.status) {
                dispatch(setUserData(res.data));
                dispatch(setUploadedPic({name: '', type: '', uri: ''}));
              }
            });
          dispatch(setIsEditable(false));
        }
      })
      .catch(error => {
        console.log('@@@-editRPfile-', JSON.stringify(error));
        showErrorToast(error?.message);
      });
  };

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      console.log('profile image', image);
      dispatch(setUserData({...userData, profile_image: image?.path}));
      dispatch(
        setUploadedPic({
          name: image?.path.split('/').pop() || '',
          type: image?.mime,
          uri: image?.path,
        }),
      );
    });
  };

  const selectImageFromGallery = React.useCallback(() => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      dispatch(setUserData({...userData, profile_image: image?.path}));
      dispatch(
        setUploadedPic({
          name: image?.path.split('/').pop() || '',
          type: image?.mime,
          uri: image?.path,
        }),
      );
    });
  }, []);

  React.useEffect(() => {
    profile()
      .unwrap()
      .then(res => {
        if (res.status) {
          dispatch(setUserData(res.data));
        }
      })
      .catch(async (error: {status: number}) => {
        if (error.status === 401) {
          console.log('session@@@#####', error);
          useSessionExpire({
            handleOnPress: handleSessionExpired,
            sessionExpire: true,
          });
        }
      });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Image source={IMAGES.icon_back} resizeMode="contain" />
          </TouchableOpacity>
          <TextView text={'Profile'} style={styles.headerText} />
          {isEditable ? (
            <TouchableOpacity onPress={handleUpdateProfile}>
              {updateProfileIsLoading ? (
                <ActivityIndicator size={30} color={COLORS.parentColor} />
              ) : (
                <Image source={IMAGES.icon_tick} resizeMode="contain" />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleEditPress}>
              <Image source={IMAGES.edit_icon} resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.imageShowParentView}>
          <View style={[styles.imageShowView]}>
            {userData?.profile_image ? (
              <Image
                source={{
                  uri: userData?.profile_image,
                }}
                style={styles.profileImageStyle}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={IMAGES.profile_dummy_image}
                style={[styles.profileImageStyle]}
                resizeMode="contain"
              />
            )}
            {isEditable && (
              <TouchableOpacity
                disabled={!isEditable}
                activeOpacity={0.9}
                onPress={handleProfilePress}
                style={styles.profileView}>
                <Image
                  source={IMAGES.camera_icon}
                  style={styles.cameraImageStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.centerSection}>
          <CustomTextInput
            textInputStyle={styles.inputTextStyle}
            placeHolder={Constant.firstName}
            value={userData?.first_name}
            isEditable={isEditable}
            keyboardType="email-address"
            returnKeyType={'next'}
            maxLength={30}
            multiline={true}
            onChange={text => {
              dispatch(setUserData({...userData, first_name: text.toString()}));
            }}
          />
          <CustomTextInput
            textInputStyle={styles.inputTextStyle}
            placeHolder={Constant.lastName}
            value={userData?.last_name}
            isEditable={isEditable}
            multiline={true}
            onChange={text => {
              dispatch(setUserData({...userData, last_name: text.toString()}));
            }}
            returnKeyType={'done'}
            maxLength={3305}
          />
          <CustomTextInput
            textInputStyle={styles.inputTextStyle}
            placeHolder={Constant.emailAddress}
            value={userData?.email}
            isEditable={false}
            onChange={text => {
              dispatch(setUserData({...userData, email: text.toString()}));
            }}
            returnKeyType={'done'}
          />
          <CountryCodeInput
            keyBoardOptions="phone-pad"
            placeHolder={Constant.mobileNumber}
            value={userData?.phone_number}
            leftText={'+' + userData?.country_code}
            countryCodeText={styles.countryCodeText}
            isEditable={false}
            onchange={(e: string) => {
              dispatch(setUserData({...userData, phone_number: e.toString()}));
            }}
          />
          <TouchableOpacity
            onPress={handleChangePasswordPress}
            style={styles.inputParentView}>
            <TextView
              text={Constant.changePassword}
              style={styles.changePasswordText}
            />
          </TouchableOpacity>
          <View style={styles.signOutView}>
            <CustomBottomButton
              text="SIGN OUT"
              onPress={handleLogoutPress}
              style={styles.signOut}
              displayLoading={isLoading}
            />
          </View>
        </View>
      </View>
      <PasswordOverlay />
      <ImageSelector
        modalVisible={visibleImageModal}
        onPressModalClose={() => {
          setVisibleImageModal(false);
        }}
        onPressCameraButton={() => {
          setVisibleImageModal(false);
          setTimeout(() => {
            openCamera();
          }, 700);
        }}
        onPressGalleryButton={() => {
          setVisibleImageModal(false);
          setTimeout(() => {
            selectImageFromGallery();
          }, 700);
        }}
      />
      <ActivityIndicator size={30} color={COLORS.whiteColor} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
