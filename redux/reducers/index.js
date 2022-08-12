// Burada bütün reducerlarımızı bir araya topluyoruz.
// import {combineReducers} from 'redux';
// import counterReducer from "./xReducer";

// const reducers = combineReducers({
//     counterReducer
// });

// export default reducers;

import {combineReducers} from 'redux';
import changeLoggedUserReducer from './changeLoggedUserReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  changeLoggedUserReducer: persistReducer(
    persistConfig,
    changeLoggedUserReducer,
  ),
});

export default reducers;
