import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRegisterFormError } from './selectors';
import * as api from './api';
import { registerSuccess, resetRegisterFormError } from './actionsCreators';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectRegisterFormError);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      api
        .register({
          name: form.username.value,
          password: form.password.value,
          passwordRepeat: form.passwordRepeat.value,
        })
        .then((user) => {
          dispatch(registerSuccess(user));
          form.reset();
          navigate('/');
        });
    },
    [dispatch, navigate]
  );

  const resetErrorOnChange = React.useCallback(() => {
    dispatch(resetRegisterFormError());
  }, [dispatch]);

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
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
          name="username"
          onChange={resetErrorOnChange}
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
          onChange={resetErrorOnChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password-repeat-input" className="form-label">
          Повторите пароль
        </label>
        <input
          type="password"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="password-repeat-input"
          name="passwordRepeat"
          onChange={resetErrorOnChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Зарегистрироваться
      </button>
    </form>
  );
}

export default Register;
