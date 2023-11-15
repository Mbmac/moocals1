import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AdvertisementListData} from '../query/AdvertisementList/type';
import {
  IAdvertisementTrack,
  IPaginationData,
} from '../query/AdvertisementTrack/type';

export interface AdvertisementState {
  list: AdvertisementListData[];
  track: IAdvertisementTrack[];
  paginationData: IPaginationData;
}

const initialState: AdvertisementState = {
  list: [],
  paginationData: {
    prevUrl: '',
    nextUrl: '',
  },
  track: [],
};

const advertisementSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdvertisementList: (
      state,
      action: PayloadAction<AdvertisementListData[]>,
    ) => {
      state.list = action.payload;
    },
    setAdvertisementTrack: (
      state,
      action: PayloadAction<IAdvertisementTrack[]>,
    ) => {
      state.track = action.payload;
    },
    setPaginationData: (state, action: PayloadAction<IPaginationData>) => {
      state.paginationData = action.payload;
    },
  },
});

const {reducer, actions} = advertisementSlice;

export const {setAdvertisementList, setAdvertisementTrack, setPaginationData} =
  actions;

export default reducer;
