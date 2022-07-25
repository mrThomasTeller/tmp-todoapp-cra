import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks/tasksSlice';
import authSlice from './features/auth/authSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    tasks: tasksSlice,
  },
});
