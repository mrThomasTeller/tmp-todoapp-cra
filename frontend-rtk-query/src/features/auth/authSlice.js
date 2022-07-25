import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

class FormError extends Error {
  constructor(message, field) {
    super(message);
    this.message = message;
    this.name = field;
  }
}

const initialState = {
  authChecked: false,
  user: undefined,
  loginFormError: undefined,
};

export const checkAuth = createAsyncThunk('auth/check', () =>
  fetch('/api/auth/check').then((result) => result.json())
);

export const login = createAsyncThunk('auth/login', async (credentials) => {
  if (!credentials.name.trim() || !credentials.password.trim()) {
    throw new Error('Не все поля заполнены');
  }

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
    throw new FormError(error, 'name');
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
    resetLoginFormError: (state) => {
      state.loginFormError = undefined;
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
      });
  },
});

export const { resetLoginFormError } = authSlice.actions;

export const selectAuthChecked = (state) => state.auth.authChecked;
export const selectUser = (state) => state.auth.user;
export const selectLoginFormError = (state) => state.auth.loginFormError;

export default authSlice.reducer;
