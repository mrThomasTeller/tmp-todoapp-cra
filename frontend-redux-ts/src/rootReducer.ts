import { combineReducers } from 'redux';
import authReducer from './features/auth/reducer';
import tasksReducer from './features/tasks/reducer';

export default combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});
