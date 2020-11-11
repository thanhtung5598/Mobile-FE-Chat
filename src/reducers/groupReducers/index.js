import { GROUP_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
  isLoadingExit: false,
  isLoadingCreate: false,
  message: null,
  listGroups: null,
  currentGroup: null,
  paginator: null
};

const AuthenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_TYPE.FETCH_ALL_GROUP_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GROUP_TYPE.FETCH_ALL_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listGroups: action.payload.listGroups,
        paginator: action.payload.paginator
      };
    case GROUP_TYPE.FETCH_ALL_GROUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case GROUP_TYPE.CREATE_GROUP_REQUEST:
      return {
        ...state,
        isLoadingCreate: true
      };
    case GROUP_TYPE.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        isLoadingCreate: false,
        currentGroup: action.payload
      };
    case GROUP_TYPE.CREATE_GROUP_FAILURE:
      return {
        ...state,
        isLoadingCreate: false
      };
    case GROUP_TYPE.UPDATE_GROUP_NAME_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GROUP_TYPE.UPDATE_GROUP_NAME_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case GROUP_TYPE.UPDATE_GROUP_NAME_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case GROUP_TYPE.EXIT_GROUP_REQUEST:
      return {
        ...state,
        isLoadingExit: true
      };
    case GROUP_TYPE.EXIT_GROUP_SUCCESS:
      return {
        ...state,
        isLoadingExit: false
      };
    case GROUP_TYPE.EXIT_GROUP_FAILURE:
      return {
        ...state,
        isLoadingExit: false
      };
    case GROUP_TYPE.CURRENT_GROUP_REQUEST:
      return {
        ...state,
        currentGroup: action.payload
      };
    default:
      return state;
  }
};

export default AuthenReducer;
