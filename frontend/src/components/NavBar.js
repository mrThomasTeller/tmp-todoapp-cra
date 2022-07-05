import React from 'react';
import { useSelector } from 'react-redux';

function NavBar() {
  const user = useSelector((state) => state.auth);

  if (user.name) {
    return (
      <div>
        Здаров, {user.name}. <a href="/auth/logout">Выйти</a>
      </div>
    );
  }

  return <div />;
}

export default NavBar;
