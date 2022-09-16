import { RootState } from '../../store';

export const selectAuthChecked = (state: RootState) => state.auth.authChecked;
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoginFormError = (state: RootState) => state.auth.loginFormError;
export const selectRegisterFormError = (state: RootState) => state.auth.registerFormError;
