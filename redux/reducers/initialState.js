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
const changeCurrentCityWeather = null;
const cities = [
  'Afyonkarahisar',
  'Adana',
  'Amasya',
  'Ankara',
  'Antalya',
  'Artvin',
  'Aydin',
  'Balikesir',
  'Bilecik',
  'Adiyaman',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Agri',
  'Canakkale',
  'Cankiri',
  'Corum',
  'Denizli',
  'Diyarbakir',
  'Edirne',
  'Elazig',
  'Erzincan',
  'Erzurum',
  'Eskisehir',
  'Gaziantep',
  'Giresun',
  'Gümüşhane',
  'Hakkari',
  'Hatay',
  'Isparta',
  'Bingol',
  'Istanbul',
  'Izmir',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Bursa',
  'Kirsehir',
  'Kocaeli',
  'Konya',
  'Kutahya',
  'Malatya',
  'Manisa',
  'Kahramanmaras',
  'Mardin',
  'Mugla',
  'Mus',
  'Nevsehir',
  'Nigde',
  'Ordu',
  'Rize',
  'Sakarya',
  'Samsun',
  'Siirt',
  'Sinop',
  'Sivas',
  'Tekirdag',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Sanliurfa',
  'Usak',
  'Van',
  'Yozgat',
  'Zonguldak',
  'Aksaray',
  'Bayburt',
  'Karaman',
  'Kirikkale',
  'Batman',
  'Sirnak',
  'Bartin',
  'Ardahan',
  'Igdir',
  'Yalova',
  'Karabuk',
  'Kilis',
  'Osmaniye',
  'Duzce',
  'Mersin',
  'Kirklareli',
];

module.exports = {
  loggedUser,
  cities,
  changeCurrentCityWeather,
};
