import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import './App.css';
import Main from '../features/main/Main';
import TasksList from '../features/tasks/TasksList';
import Login from '../features/auth/Login';
import { selectAuthChecked } from '../features/auth/selectors';
import * as api from '../features/auth/api';
import { userChecked } from '../features/auth/actionsCreators';
import Register from '../features/auth/Register';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const authChecked = useSelector(selectAuthChecked);

  React.useEffect(() => {
    api.checkUser().then((result) => {
      dispatch(userChecked(result.isLoggedIn ? result.user : undefined));
    });
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/tasks" element={<TasksList />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
