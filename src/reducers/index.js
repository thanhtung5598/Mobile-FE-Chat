import { combineReducers } from 'redux';
import authen from './authenReducer/authenReducer';
import dataUser from './userReducer';
import listUsers from './userSearch';
import friends from './friendReducer';

const appReducer = combineReducers({ authen, dataUser, listUsers, friends });

export default appReducer;
