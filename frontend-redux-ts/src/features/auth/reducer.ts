import { Reducer } from 'redux';
import AuthState from './types/AuthState';
import AuthAction from './types/AuthAction';

const initialState: AuthState = {
  authChecked: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_CHECKED': {
      return { ...state, authChecked: true, user: action.payload };
    }

    case 'AUTH_LOGIN_SUCCESS': {
      return { ...state, user: action.payload, loginFormError: undefined };
    }

    case 'AUTH_LOGIN_ERROR': {
      return { ...state, loginFormError: action.error };
    }

    case 'AUTH_RESET_LOGIN_FORM_ERROR': {
      return { ...state, loginFormError: undefined };
    }

    case 'AUTH_REGISTER_SUCCESS': {
      return { ...state, user: action.payload, registerFormError: undefined };
    }

    case 'AUTH_REGISTER_ERROR': {
      return { ...state, registerFormError: undefined };
    }

    case 'AUTH_RESET_REGISTER_FORM_ERROR': {
      return { ...state, registerFormError: undefined };
    }

    case 'AUTH_LOGOUT': {
      return { ...state, user: undefined };
    }
  }

  return state;
};

export default authReducer;
