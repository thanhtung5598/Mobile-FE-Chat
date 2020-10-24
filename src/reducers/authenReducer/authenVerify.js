import { AUTHENTICATION_TYPE } from 'constTypes';

const initialState = {
  isLoadingVerify: false
};

const AuthenReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_TYPE.VERIFY_FORGOT_REQUEST:
      return {
        ...state,
        isLoadingVerify: true
      };
    case AUTHENTICATION_TYPE.VERIFY_FORGOT_SUCCESS:
      return {
        ...state,
        isLoadingVerify: false
      };
    case AUTHENTICATION_TYPE.VERIFY_FORGOT_FAILURE:
      return {
        ...state,
        isLoadingVerify: false,
        error: action.payload.error
      };
    case AUTHENTICATION_TYPE.VERIFY_SIGUP_REQUEST:
      return {
        ...state,
        isLoadingVerify: true
      };
    case AUTHENTICATION_TYPE.VERIFY_SIGUP_SUCCESS:
      return {
        ...state,
        isLoadingVerify: false
      };
    case AUTHENTICATION_TYPE.VERIFY_SIGUP_FAILURE:
      return {
        ...state,
        isLoadingVerify: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default AuthenReducer;
