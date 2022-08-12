// Burada initial statelerimizi oluşturuyoruz.
import AsyncStorage from '@react-native-async-storage/async-storage';

// const loggedUser = async () => {
//   try {
//     const data = await AsyncStorage.getItem('@loggedUser');
//     if (data !== null) {
//       return data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const loggedUser = null;

module.exports = {
  loggedUser,
};
