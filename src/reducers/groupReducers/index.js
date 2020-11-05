import { GROUP_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
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
    default:
      return state;
  }
};

export default AuthenReducer;
