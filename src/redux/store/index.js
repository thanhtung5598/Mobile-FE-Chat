import { createStore } from 'redux';
import appReducer from '../reducer';

const store = createStore(appReducer);

export default store;
