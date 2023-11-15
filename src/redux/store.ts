// store.ts
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {advertisementListApi} from './query/AdvertisementList/AdvertisementListApi';
import {forgotApi} from './query/ForgotPassword/Forgot';
import {registerAPi} from './query/Register/RegisterApi';
import {changePasswordApi} from './query/changePassword/ChangePasswordApi';
import {loginApi} from './query/login/LoginApi';
import {profileApi} from './query/profile/ProfileApi';
import {updateProfileApi} from './query/updateProfile/UpdateProfileApi';
import authReducer from './slices/authSLice';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
import advertisementReducer from './slices/AdvertisementSlice';
import {AdvertisementTrackApi} from './query/AdvertisementTrack/AdvertisementTrackApi';
import {logoutApi} from './query/Logout/LogoutApi';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  modal: modalReducer,
  advertisement: advertisementReducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [changePasswordApi.reducerPath]: changePasswordApi.reducer,
  [updateProfileApi.reducerPath]: updateProfileApi.reducer,
  [registerAPi.reducerPath]: registerAPi.reducer,
  [forgotApi.reducerPath]: forgotApi.reducer,
  [advertisementListApi.reducerPath]: advertisementListApi.reducer,
  [AdvertisementTrackApi.reducerPath]: AdvertisementTrackApi.reducer,
  [logoutApi.reducerPath]: logoutApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      registerAPi.middleware,
      profileApi.middleware,
      changePasswordApi.middleware,
      updateProfileApi.middleware,
      advertisementListApi.middleware,
      AdvertisementTrackApi.middleware,
      logoutApi.middleware,
      forgotApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
