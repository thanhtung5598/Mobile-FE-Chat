import { GROUP_TYPE } from 'constTypes';

const initialState = {
  error: null,
  isLoading: false,
  singleGroups: null
};

const GroupsChecked = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_TYPE.FETCH_ALL_GROUP_CHECKED_REQUEST:
      return {
        ...state,
        singleGroups: action.payload
      };
    default:
      return state;
  }
};

export default GroupsChecked;
