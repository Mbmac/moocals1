import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ENDPOINTS from '../../../services/EndPoints';
import {RootState} from '../../store';
import {ILogoutResponse} from './type';

export const logoutApi = createApi({
  reducerPath: 'logoutApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.userToken;
      if (token) {
        console.log('token');

        headers.set('Authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: builder => ({
    logout: builder.mutation<ILogoutResponse, void>({
      query: () => ({
        url: 'logout',
        method: 'GET',
      }),
    }),
  }),
});

export const {useLogoutMutation} = logoutApi;
