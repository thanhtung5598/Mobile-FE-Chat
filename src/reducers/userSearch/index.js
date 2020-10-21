import { PROFILE_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
  listUsers: null,
  message: null
};

const AuthenReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPE.SEARCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PROFILE_TYPE.SEARCH_USER_SUCCESS:
      return {
        ...state,
        listUsers: action.payload,
        isLoading: false
      };
    case PROFILE_TYPE.SEARCH_USER_FAILURE:
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
