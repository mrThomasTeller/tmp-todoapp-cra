import User from './User';

// ts
export default interface AuthState {
  authChecked: boolean;
  user?: User;
  loginFormError?: string;
  registerFormError?: string;
}
