import { PROFILE_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
  dataUser: null,
  message: null
};

const AuthenReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPE.FETCH_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PROFILE_TYPE.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        dataUser: action.payload,
        isLoading: false
      };
    case PROFILE_TYPE.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    default:
      return state;
  }
};

export default AuthenReducer;
