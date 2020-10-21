import { PROFILE_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoadingAdd: false,
  message: null
};

const AuthenReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPE.ADD_FRIEND_REQUEST:
      return {
        ...state,
        isLoadingAdd: true
      };
    case PROFILE_TYPE.ADD_FRIEND_SUCCESS:
      return {
        ...state,
        isLoadingAdd: false
      };
    case PROFILE_TYPE.ADD_FRIEND_FAILURE:
      return {
        ...state,
        isLoadingAdd: false,
        error: null
      };
    default:
      return state;
  }
};

export default AuthenReducer;
