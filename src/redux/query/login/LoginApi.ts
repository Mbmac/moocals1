// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ILogin} from './type';
import ENDPOINTS from '../../../services/EndPoints';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.API_BASE_URL,
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: (body: ILogin) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useLoginMutation} = loginApi;
