import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApi';

function Login() {
  const navigate = useNavigate();
  const [login, { error, reset: resetQuery }] = useLoginMutation();

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const form = event.target;

      const result = await login({
        name: form.name.value,
        password: form.password.value,
      });

      if (!result.error) {
        form.reset();
        navigate('/');
      }
    },
    [login, navigate]
  );

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Вход</h2>
      {error && (
        <div className="invalid-feedback mb-3" style={{ display: 'block' }}>
          {error.data.error}
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
          onChange={resetQuery}
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
          onChange={resetQuery}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Войти
      </button>
    </form>
  );
}

export default Login;
