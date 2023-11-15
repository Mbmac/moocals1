import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ENDPOINTS from '../../../services/EndPoints';
import {RootState} from '../../store';
import {IAdvertisementTrack, IAdvertisementTrackBody} from './type';

export const AdvertisementTrackApi = createApi({
  reducerPath: 'AdvertisementTrackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.userToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: builder => ({
    advertisementTrack: builder.mutation({
      query: (body: IAdvertisementTrackBody) => ({
        url: 'advertisement/track',
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const {useAdvertisementTrackMutation} = AdvertisementTrackApi;
