import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ENDPOINTS from '../../../services/EndPoints';
import {RootState} from '../../store';

export const updateProfileApi = createApi({
  reducerPath: 'updateProfileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.userToken;
      if (token) {
        // Set the 'Authorization' header with the user token
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    updateProfile: builder.mutation({
      // Specify the query function for the 'updateProfile' mutation
      query: body => ({
        url: 'edit-profile',
        method: 'POST',
        body,
      }),
      // query: arg => {
      //   const {start, end} = arg;
      //   console.log('arg: ', arg);
      //   return {
      //     url: 'edit-profile',
      //     params: {start, end},
      //   };
      // },
    }),
  }),
});

export const {useUpdateProfileMutation} = updateProfileApi;
