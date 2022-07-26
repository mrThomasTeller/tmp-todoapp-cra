import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import './App.css';
import Main from '../features/main/Main';
import TasksList from '../features/tasks/TasksList';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import { useUserQuery } from '../features/auth/authApi';

function App() {
  const userQuery = useUserQuery();

  if (!userQuery.data) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
