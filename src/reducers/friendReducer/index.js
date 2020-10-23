import { PROFILE_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
  isLoadingAdd: false,
  isLoadingRemove: false,
  listFriendsWait: null,
  listPhonebookSync: null,
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
    case PROFILE_TYPE.FETCH_FRIEND_WAIT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PROFILE_TYPE.FETCH_FRIEND_WAIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listFriendsWait: action.payload
      };
    case PROFILE_TYPE.FETCH_FRIEND_WAIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        listFriendsWait: null
      };
    case PROFILE_TYPE.FETCH_PHONEBOOK_SYNC_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PROFILE_TYPE.FETCH_PHONEBOOK_SYNC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listPhonebookSync: action.payload
      };
    case PROFILE_TYPE.FETCH_PHONEBOOK_SYNC_FAILURE:
      return {
        ...state,
        isLoading: false,
        listPhonebookSync: null
      };
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
        isLoadingAdd: false
      };
    case PROFILE_TYPE.DELETE_FRIEND_REQUEST:
      return {
        ...state,
        isLoadingRemove: true
      };
    case PROFILE_TYPE.DELETE_FRIEND_SUCCESS:
      return {
        ...state,
        isLoadingRemove: false
      };
    case PROFILE_TYPE.DELETE_FRIEND_FAILURE:
      return {
        ...state,
        isLoadingRemove: false
      };
    default:
      return state;
  }
};

export default AuthenReducer;
