import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectLoginForm, setLoginFormName, setLoginFormPassword } from './authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, password, error } = useSelector(selectLoginForm);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const dispatchResult = await dispatch(login({ name, password }));
      if (!dispatchResult.error) navigate('/');
    },
    [dispatch, navigate, name, password]
  );

  const handleNameChange = React.useCallback(
    (event) => dispatch(setLoginFormName(event.target.value)),
    [dispatch]
  );

  const handlePasswordChange = React.useCallback(
    (event) => dispatch(setLoginFormPassword(event.target.value)),
    [dispatch]
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
          Name
        </label>
        <input
          type="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="name-input"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password-input" className="form-label">
          Password
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Login;
