import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

const {reducer, actions} = authSlice;

export const {setUserToken} = actions;

export default reducer;
