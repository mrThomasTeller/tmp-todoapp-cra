import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Main() {
  return (
    <>
      <h1 className="mb-1">
        <Link className="link-unstyled" to="/">
          Список дел
        </Link>
      </h1>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Main;
