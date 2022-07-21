import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  authChecked: false,
  user: undefined,
  loginForm: {
    name: '',
    password: '',
    error: undefined,
  },
  registerForm: {
    name: '',
    password: '',
    error: undefined,
  },
};

export const checkAuth = createAsyncThunk('auth/check', () =>
  fetch('/api/auth/check').then((result) => result.json())
);

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const data = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (data.status >= 400) {
    const { error } = await data.json();
    throw error;
  } else {
    return data.json();
  }
});

export const register = createAsyncThunk('auth/register', async (credentials) => {
  const data = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (data.status >= 400) {
    const { error } = await data.json();
    throw error;
  } else {
    return data.json();
  }
});

export const logout = createAsyncThunk('auth/logout', () =>
  fetch('/api/auth/logout', {
    method: 'POST',
  }).then((result) => result.json())
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginFormName: (state, action) => {
      state.loginForm.name = action.payload;
      state.loginForm.error = undefined;
    },
    setLoginFormPassword: (state, action) => {
      state.loginForm.password = action.payload;
      state.loginForm.error = undefined;
    },
    setRegisterFormName: (state, action) => {
      state.registerForm.name = action.payload;
      state.registerForm.error = undefined;
    },
    setRegisterFormPassword: (state, action) => {
      state.registerForm.password = action.payload;
      state.registerForm.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authChecked = true;
        state.user = action.payload.isLoggedIn ? action.payload.user : undefined;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginForm = initialState.loginForm;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginForm.error = action.error.message;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerForm = initialState.registerForm;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerForm.error = action.error.message;
      });
  },
});

export const {
  setLoginFormName,
  setLoginFormPassword,
  setRegisterFormName,
  setRegisterFormPassword,
} = authSlice.actions;

export const selectAuthChecked = (state) => state.auth.authChecked;
export const selectUser = (state) => state.auth.user;
export const selectLoginForm = (state) => state.auth.loginForm;
export const selectRegisterForm = (state) => state.auth.registerForm;

export default authSlice.reducer;
