import { GROUP_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
  isLoadingExit: false,
  isLoadingCreate: false,
  isLoadingAddMember: false,
  message: null,
  listGroups: null,
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
        isLoadingCreate: false
      };
    case GROUP_TYPE.CREATE_GROUP_FAILURE:
      return {
        ...state,
        isLoadingCreate: false
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
    case GROUP_TYPE.ADD_MEMBER_REQUEST:
      return {
        ...state,
        isLoadingAddMember: true
      };
    case GROUP_TYPE.ADD_MEMBER_SUCCESS:
      return {
        ...state,
        isLoadingAddMember: false
      };
    case GROUP_TYPE.ADD_MEMBER_FAILURE:
      return {
        ...state,
        isLoadingAddMember: false
      };
    default:
      return state;
  }
};

export default AuthenReducer;
