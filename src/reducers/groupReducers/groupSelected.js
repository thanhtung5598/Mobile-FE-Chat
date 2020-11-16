import { GROUP_TYPE } from 'constTypes';

const initialState = {
  error: null,
  message: null,
  isLoading: false,
  currentGroup: null
};

const AuthenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_TYPE.UPDATE_GROUP_NAME_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GROUP_TYPE.UPDATE_GROUP_NAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentGroup: {
          ...state.currentGroup,
          name: action.payload.name
        }
      };
    case GROUP_TYPE.UPDATE_GROUP_NAME_FAILURE:
      return {
        ...state,
        isLoading: false
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
