import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import tasksReducer from './tasks/reducer';

export default combineReducers({
  auth: authReducer,
  tasks: tasksReducer
});
