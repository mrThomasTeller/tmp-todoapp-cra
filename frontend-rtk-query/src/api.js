import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export default createApi({
  reducerPath: 'api',
  tagTypes: ['User', 'Task'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),

  endpoints: () => ({}),
});
