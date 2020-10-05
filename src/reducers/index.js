import { combineReducers } from 'redux';
import authen from './authenReducer/authenReducer';

const appReducer = combineReducers({ authen });

export default appReducer;
