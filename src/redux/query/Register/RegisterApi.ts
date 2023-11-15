// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ENDPOINTS from '../../../services/EndPoints';
import {IRegister} from './type';

export const registerAPi = createApi({
  reducerPath: 'register',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.API_BASE_URL,
  }),
  endpoints: builder => ({
    register: builder.mutation({
      query: (body: IRegister) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useRegisterMutation} = registerAPi;
