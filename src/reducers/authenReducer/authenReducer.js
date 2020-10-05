import { AUTHENTICATION_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  auth_token: null,
  message: null
};

const AuthenReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_TYPE.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        message: null,
        auth_token: action.payload
      };
    case AUTHENTICATION_TYPE.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        message: action.payload.data[0]
      };
    case AUTHENTICATION_TYPE.IS_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        auth_token: action.payload.accessToken
      };
    case AUTHENTICATION_TYPE.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default AuthenReducer;
