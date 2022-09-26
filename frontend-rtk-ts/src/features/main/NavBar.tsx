import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { logout } from '../auth/authSlice';
import { selectUser } from '../auth/selectors';

function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = React.useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();

      const dispatchResult = await dispatch(logout());
      if (logout.fulfilled.match(dispatchResult)) {
        navigate('/');
      }
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
