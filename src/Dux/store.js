import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from '../Dux/authReducer';
import userReducer from '../Dux/userReducer';

const rootReducer = combineReducers({
    authReducer, userReducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));