import User from './types/User';
import AuthAction from './types/AuthAction';

export const userChecked = (user: User | undefined): AuthAction => ({
  type: 'AUTH_USER_CHECKED',
  payload: user,
});

export const loginSuccess = (user: User): AuthAction => ({
  type: 'AUTH_LOGIN_SUCCESS',
  payload: user,
});

export const loginError = (error: string): AuthAction => ({
  type: 'AUTH_LOGIN_ERROR',
  error,
});

export const resetLoginFormError = (): AuthAction => ({
  type: 'AUTH_RESET_LOGIN_FORM_ERROR',
});

export const registerSuccess = (user: User): AuthAction => ({
  type: 'AUTH_REGISTER_SUCCESS',
  payload: user,
});

export const registerError = (error: string): AuthAction => ({
  type: 'AUTH_REGISTER_ERROR',
  error,
});

export const resetRegisterFormError = (): AuthAction => ({
  type: 'AUTH_RESET_REGISTER_FORM_ERROR',
});

export const logoutSuccess = (): AuthAction => ({ type: 'AUTH_LOGOUT' });
