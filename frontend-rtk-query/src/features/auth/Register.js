import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from './authApi';

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    getValues,
  } = useForm({ mode: 'onSubmit', shouldUseNativeValidation: false });

  const [registerQuery] = useRegisterMutation();

  const submit = handleSubmit(async (data) => {
    const { error } = await registerQuery({
      name: data.name,
      password: data.password,
      passwordRepeat: data.passwordRepeat,
    });

    if (error) {
      setError('name', {
        type: 'manual',
        message: error.data.error,
      });
    } else {
      reset();
      navigate('/');
    }
  });

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Регистрация</h2>

      <div className="mb-3">
        <label htmlFor="name-input" className="form-label">
          Имя
        </label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="name-input"
          {...register('name', { required: 'Это поле обязательно для заполнения' })}
        />
        <Error error={errors.name?.message} />
      </div>

      <div className="mb-3">
        <label htmlFor="password-input" className="form-label">
          Пароль
        </label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id="password-input"
          {...register('password', { required: 'Это поле обязательно для заполнения' })}
        />
        <Error error={errors.password?.message} />
      </div>

      <div className="mb-3">
        <label htmlFor="password-repeat-input" className="form-label">
          Повторите пароль
        </label>
        <input
          type="password"
          className={`form-control ${errors.passwordRepeat ? 'is-invalid' : ''}`}
          id="password-repeat-input"
          {...register('passwordRepeat', {
            validate: (value) => value === getValues('password') || 'Пароли не совпадают',
          })}
        />
        <Error error={errors.passwordRepeat?.message} />
      </div>

      <button type="submit" className="btn btn-primary">
        Зарегистрироваться
      </button>
    </form>
  );
}

export default Register;

function Error({ error }) {
  if (!error) return null;

  return (
    <div className="invalid-feedback mb-3" style={{ display: 'block' }}>
      {error}
    </div>
  );
}
