import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectLoginFormError, resetLoginFormError } from './authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectLoginFormError);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const form = event.target;
      const dispatchResult = await dispatch(
        login({
          name: form.name.value,
          password: form.password.value,
        })
      );

      if (!dispatchResult.error) {
        form.reset();
        navigate('/');
      }
    },
    [dispatch, navigate]
  );

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Вход</h2>
      {error && (
        <div className="invalid-feedback mb-3" style={{ display: 'block' }}>
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="name-input" className="form-label">
          Имя
        </label>
        <input
          type="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="name-input"
          name="name"
          onChange={resetLoginFormError}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password-input" className="form-label">
          Пароль
        </label>
        <input
          type="password"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="password-input"
          name="password"
          onChange={resetLoginFormError}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Войти
      </button>
    </form>
  );
}

export default Login;
