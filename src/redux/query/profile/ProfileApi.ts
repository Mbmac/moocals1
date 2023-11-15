import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ENDPOINTS from '../../../services/EndPoints';
import {IProfileResponse} from './type';
import {RootState} from '../../store';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.userToken;
      console.log('token--', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: builder => ({
    profile: builder.mutation<IProfileResponse, void>({
      query: () => ({
        url: 'profile',
        method: 'GET',
      }),
    }),
  }),
});

export const {useProfileMutation} = profileApi;
