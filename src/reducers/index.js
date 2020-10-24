import { combineReducers } from 'redux';
import authen from './authenReducer/authenReducer';
import authVerify from './authenReducer/authenVerify';
import dataUser from './userReducer';
import listUsers from './userSearch';
import friends from './friendReducer';

const appReducer = combineReducers({
  authen,
  dataUser,
  listUsers,
  friends,
  authVerify
});

export default appReducer;
