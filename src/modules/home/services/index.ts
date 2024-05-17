import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import {IContact} from '@modules/home/screens/homeMain/types';
import {omit} from 'lodash';
export const {API_HOST} = Config;

export const contactApi = createApi({
  reducerPath: 'contact',
  baseQuery: fetchBaseQuery({baseUrl: API_HOST}),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => 'contact',
    }),
    createContacts: builder.mutation({
      query: (body: IContact) => ({
        url: 'contact',
        method: 'POST',
        body,
      }),
    }),
    updateContacts: builder.mutation({
      query: (body: IContact) => ({
        url: `contact/${body?.id}`,
        method: 'PUT',
        body: omit(body, 'id'),
      }),
    }),
    deleteContacts: builder.mutation({
      query: (id: string) => ({
        url: `contact/${id}`,
        method: 'DELETE',
      }),
    }),
    getContact: builder.mutation({
      query: (id: string) => ({
        url: `contact/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactsMutation,
  useGetContactMutation,
  useUpdateContactsMutation,
  useDeleteContactsMutation,
} = contactApi;
