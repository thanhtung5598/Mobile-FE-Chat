import { combineReducers } from 'redux';
import authen from './authenReducer/authenReducer';
import dataUser from './userReducer';

const appReducer = combineReducers({ authen, dataUser });

export default appReducer;
