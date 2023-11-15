import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserState {
  isChangePasswordModal: boolean;
}

const initialState: UserState = {
  isChangePasswordModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsChangePasswordModal: (state, action: PayloadAction<boolean>) => {
      state.isChangePasswordModal = action.payload;
    },
  },
});

const {reducer, actions} = modalSlice;

export const {setIsChangePasswordModal} = actions;

export default reducer;
