import { PROFILE_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
  listRequestFriends: null,
  listFriends: null,
  message: null
};

const AuthenReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPE.FETCH_LIST_FRIENDS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PROFILE_TYPE.FETCH_LIST_FRIENDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listFriends: action.payload
      };
    case PROFILE_TYPE.FETCH_LIST_FRIENDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        listFriends: null
      };
    case PROFILE_TYPE.FETCH_REQUEST_FRIENDS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PROFILE_TYPE.FETCH_REQUEST_FRIENDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listRequestFriends: action.payload
      };
    case PROFILE_TYPE.FETCH_REQUEST_FRIENDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        listRequestFriends: null
      };
    default:
      return state;
  }
};

export default AuthenReducer;
