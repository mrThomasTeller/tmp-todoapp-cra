import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks/tasksSlice';
import authSlice from './features/auth/authSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: tasksSlice,
  },
});

// ts
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
