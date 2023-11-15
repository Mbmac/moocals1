import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ENDPOINTS from '../../../services/EndPoints';
import {RootState} from '../../store';
import {IAdvertisementListResponse} from './type';

export const advertisementListApi = createApi({
  reducerPath: 'advertisementListApi',
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
    advertisementList: builder.mutation<
      IAdvertisementListResponse,
      {page: number}
    >({
      query: ({page}) => ({
        url: `advertisement?page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useAdvertisementListMutation} = advertisementListApi;
