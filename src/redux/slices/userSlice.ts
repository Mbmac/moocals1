import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IUploadedPic, ProfileData} from '../query/profile/type';

export interface UserState {
  userData: ProfileData;
  isEditable: boolean;
  uploadedPic: IUploadedPic;
}

const initialState: UserState = {
  userData: {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    country_code: '',
    gender: 1,
    profile_image: '',
  },
  isEditable: false,
  uploadedPic: {
    name: '',
    type: '',
    uri: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ProfileData>) => {
      state.userData = action.payload;
    },
    setIsEditable: (state, action: PayloadAction<boolean>) => {
      state.isEditable = action.payload;
    },
    setUploadedPic: (state, action: PayloadAction<IUploadedPic>) => {
      state.uploadedPic = action.payload;
    },
  },
});

const {reducer, actions} = userSlice;

export const {setUserData, setIsEditable, setUploadedPic} = actions;

export default reducer;
