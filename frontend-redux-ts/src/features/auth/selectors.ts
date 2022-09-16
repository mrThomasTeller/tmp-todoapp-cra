import { RootState } from '../../store';

export const selectAuthChecked = (state: RootState) => state.auth.authChecked;
export const selectUser = (state: RootState) => state.auth.user;
