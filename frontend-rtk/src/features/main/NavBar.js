import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { selectUser, logout } from '../auth/authSlice';

function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = React.useCallback(
    async (event) => {
      event.preventDefault();
      await dispatch(logout());
      navigate('/');
    },
    [dispatch, navigate]
  );

  return (
    <div className="mb-3">
      {user && (
        <div className="mb-3">
          Здаров, {user.name}.{' '}
          <a href="#" role="button" tabIndex={0} onClick={handleLogout}>
            Выйти
          </a>
        </div>
      )}
      <div>
        {!user ? (
          <>
            <Link className="btn btn-light btn-lg ms-3" to="/auth/login">
              Войти
            </Link>
            <Link className="btn btn-light btn-lg ms-3" to="/auth/register">
              Регистрация
            </Link>
          </>
        ) : location.pathname !== '/tasks' ? (
          <Link className="btn btn-light btn-lg" to="/tasks">
            Перейти к списку
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default NavBar;
