// Burada aksiyonlarımızı oluşturuyoruz.
// import * as actionTypes from "../actions/actionsType";
// import initialState from './initialState'

// const counterReducer=(state=initialState.xCounter,action)=>{
//     let newState;
//     switch (action.type) {
//         case actionTypes.INCREASE_COUNTER:
//             return(newState = state+action.payload);
//         case actionTypes.DECREASE_COUNTER:
//             return(newState = state-action.payload);
//         case actionTypes.INCREASE_BY_TWO_COUNTER:
//             return(newState = state+action.payload);
//         default:
//             return state;
//     }
// };

// export default counterReducer;

import * as actionTypes from '../actions/actionsType';
import initialState from './initialState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const changeLoggedUserReducer = (state = controlLoggedUser(), action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGGED_USER:
      return action.payload;
    default:
      return state;
  }
};

export default changeLoggedUserReducer;

const controlLoggedUser = async () => {
  const loggedUser = await AsyncStorage.getItem('@loggedUser');
  console.log(loggedUser);
  if (loggedUser) {
    return loggedUser;
  } else {
    return '';
  }
};
