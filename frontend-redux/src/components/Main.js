import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

function Main() {
  return (
    <>
      <h1 className="mb-1">Список дел</h1>
      <NavBar />
      <Link className="btn btn-primary btn-xl" to="/tasks">
        Перейти к списку
      </Link>
      &nbsp;&nbsp;&nbsp;
      <a className="btn btn-primary btn-xl" href="/auth/register">Регистрация</a>&nbsp;&nbsp;&nbsp;
      <Link className="btn btn-primary btn-xl" to="/login">Login</Link>
    </>
  );
}

export default Main;
