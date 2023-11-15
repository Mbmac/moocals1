// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IForgot} from './type';
import ENDPOINTS from '../../../services/EndPoints';
// http://192.168.11.4/sumitrana/2023/PhpProject/Banner/banner-app/api/users/reset-password

export const forgotApi = createApi({
  reducerPath: 'reset-password',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.API_BASE_URL,
  }),
  endpoints: builder => ({
    forgot: builder.mutation({
      query: (body: IForgot) => ({
        url: 'reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useForgotMutation} = forgotApi;
