import User from './User';

type AuthAction =
  | { type: 'AUTH_LOGIN_SUCCESS'; payload: User }
  | { type: 'AUTH_LOGIN_ERROR'; error: string }
  | { type: 'AUTH_RESET_LOGIN_FORM_ERROR' }
  | { type: 'AUTH_REGISTER_SUCCESS'; payload: User }
  | { type: 'AUTH_REGISTER_ERROR'; error: string }
  | { type: 'AUTH_RESET_REGISTER_FORM_ERROR' }
  | { type: 'AUTH_USER_CHECKED'; payload: User | undefined }
  | { type: 'AUTH_LOGOUT' };

export default AuthAction;
