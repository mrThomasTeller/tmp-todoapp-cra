import { configureStore } from '@reduxjs/toolkit';
import api from './api';

let a = 1;

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
