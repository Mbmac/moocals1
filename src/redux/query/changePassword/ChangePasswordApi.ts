// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ENDPOINTS from '../../../services/EndPoints';
import {IChangePassword} from './type';
import {RootState} from '../../store';

export const changePasswordApi = createApi({
  reducerPath: 'changePasswordApi',
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
    changePassword: builder.mutation({
      query: (body: IChangePassword) => ({
        url: 'update-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const {useChangePasswordMutation} = changePasswordApi;
