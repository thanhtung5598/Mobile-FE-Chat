import { combineReducers } from 'redux';
import authen from './authenReducer/authenReducer';
import authVerify from './authenReducer/authenVerify';
import dataUser from './userReducer';
import listUsers from './userSearch';
import friends from './friendReducer';
import groups from './groupReducers';
import groupSelected from './groupReducers/groupSelected';

const appReducer = combineReducers({
  authen,
  dataUser,
  listUsers,
  friends,
  authVerify,
  groups,
  groupSelected
});

export default appReducer;
