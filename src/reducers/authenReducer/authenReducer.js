import { AUTHENTICATION_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
  isLoadingChangePass: false,
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
    case AUTHENTICATION_TYPE.SEND_OTP_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.SEND_OTP_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: null
      };
    case AUTHENTICATION_TYPE.SEND_OTP_REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        message: action.payload.data[0]
      };
    case AUTHENTICATION_TYPE.SEND_OTP_FORGOT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.SEND_OTP_FORGOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: null
      };
    case AUTHENTICATION_TYPE.SEND_OTP_FORGOT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        message: action.payload.data[0]
      };
    case AUTHENTICATION_TYPE.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: null,
        isAuthenticated: true,
        auth_token: action.payload.accessToken
      };
    case AUTHENTICATION_TYPE.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        message: action.payload.data[0]
      };
    case AUTHENTICATION_TYPE.VERIFY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case AUTHENTICATION_TYPE.VERIFY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case AUTHENTICATION_TYPE.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoadingChangePass: true
      };
    case AUTHENTICATION_TYPE.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoadingChangePass: false,
        isAuthenticated: true,
        error: null,
        message: null,
        auth_token: action.payload.token
      };
    case AUTHENTICATION_TYPE.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoadingChangePass: false,
        error: action.payload.error
      };
    case AUTHENTICATION_TYPE.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    case AUTHENTICATION_TYPE.REFRESH_REQUEST:
      return {
        ...state,
        error: null,
        message: null
      };
    default:
      return state;
  }
};

export default AuthenReducer;
