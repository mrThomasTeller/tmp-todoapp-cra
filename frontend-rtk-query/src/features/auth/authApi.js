import api from '../../api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    user: build.query({
      query: () => 'auth/user',
      providesTags: ['User'],
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Task'],
    }),

    register: build.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Task'],
    }),

    logout: build.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Task'],
    }),
  }),
});

export const { useUserQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;
