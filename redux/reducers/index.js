// Burada bütün reducerlarımızı bir araya topluyoruz.
// import {combineReducers} from 'redux';
// import counterReducer from "./xReducer";

// const reducers = combineReducers({
//     counterReducer
// });

// export default reducers;

import {combineReducers} from 'redux';
import changeLoggedUserReducer from './changeLoggedUserReducer';

const reducers = combineReducers({
  changeLoggedUserReducer,
});

export default reducers;
