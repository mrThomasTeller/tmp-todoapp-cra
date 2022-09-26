import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRegisterFormError } from './selectors';
import * as api from './api';
import { registerSuccess, resetRegisterFormError } from './actionsCreators';

function Register(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectRegisterFormError);
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      api
        .register({
          name,
          password,
          passwordRepeat,
        })
        .then((user) => {
          dispatch(registerSuccess(user));
          navigate('/');
        });
    },
    [dispatch, name, navigate, password, passwordRepeat]
  );

  const handleNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
      dispatch(resetRegisterFormError());
    },
    [dispatch]
  );

  const handlePasswordChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      dispatch(resetRegisterFormError());
    },
    [dispatch]
  );

  const handlePasswordRepeatChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordRepeat(event.target.value);
      dispatch(resetRegisterFormError());
    },
    [dispatch]
  );

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
          value={name}
          onChange={handleNameChange}
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
          value={password}
          onChange={handlePasswordChange}
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
          value={passwordRepeat}
          onChange={handlePasswordRepeatChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Зарегистрироваться
      </button>
    </form>
  );
}

export default Register;
