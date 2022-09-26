import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthState from './types/AuthState';
import Credentials from './types/Credentials';
import * as api from './api';
import RegisterData from './types/RegisterData';

const initialState: AuthState = {
  authChecked: false,
  user: undefined,
  loginFormError: undefined,
  registerFormError: undefined,
};

export const getUser = createAsyncThunk('auth/user', () => api.user());

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials) => {
    if (!credentials.name.trim() || !credentials.password.trim()) {
      throw new Error('Не все поля заполнены');
    }

    return api.login(credentials);
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData) => {
    if (data.password !== data.passwordRepeat) {
      throw new Error('Пароли не совпадают');
    }

    if (!data.name.trim() || !data.password.trim()) {
      throw new Error('Не все поля заполнены');
    }

    return api.register(data);
  }
);

export const logout = createAsyncThunk('auth/logout', api.logout);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLoginFormError: (state) => {
      state.loginFormError = undefined;
    },
    resetRegisterFormError: (state) => {
      state.registerFormError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authChecked = true;
        state.user = action.payload.isLoggedIn
          ? action.payload.user
          : undefined;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginFormError = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginFormError = action.error.message;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerFormError = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerFormError = action.error.message;
      });
  },
});

export const { resetLoginFormError, resetRegisterFormError } =
  authSlice.actions;

export default authSlice.reducer;
