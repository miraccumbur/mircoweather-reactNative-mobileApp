import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {turkishToEnglish} from '../function';
import magicString from '../magicString';
import {changeCurrentCityWeather} from '../redux/actions/changeCurrentCityWeather';

const WeatherPage = ({
  citiesReducer,
  changeCurrentCityWeather,
  changeCurrentCityWeatherReducer,
}) => {
  const [recomendedAreaDisplay, setRecomendedAreaDisplay] = useState(false);
  const [handleCity, setHandleCity] = useState('');
  const [filteredCity, setFilteredCity] = useState(null);
  const getCitiesFunction = async () => {
    alert(handleCity);
  };

  useEffect(() => {
    setHandleCity(changeCurrentCityWeatherReducer.name);
  }, [changeCurrentCityWeatherReducer]);

  useEffect(() => {
    const cityArray = [];
    citiesReducer.map(city => {
      if (city.includes(turkishToEnglish(handleCity))) cityArray.push(city);
    });

    setFilteredCity(cityArray);
  }, [citiesReducer, handleCity]);

  const getWeather = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/getWeather/city=' + handleCity,
      );

      const data = await response.json();
      if (data.code === 200) {
        console.log(data.data.name);
        changeCurrentCityWeather(data.data);
      } else {
        throw magicString.SOMETHING_IS_WRONG;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/background-photos/main.jpg')}
      style={styles.container}>
      <Header />
      <SafeAreaView style={styles.SafeAreaStyle}>
        <View style={styles.weatherArea}>
          <View style={styles.searchArea}>
            <TouchableOpacity onPress={() => getWeather()}>
              <Image
                style={styles.searchImage}
                source={require('../assets/icons/search.png')}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder="Your City"
              value={handleCity}
              onChangeText={setHandleCity}
              onFocus={() => setRecomendedAreaDisplay(true)}
              onBlur={() => setRecomendedAreaDisplay(false)}
              onChange={() => setRecomendedAreaDisplay(true)}
            />
          </View>
          {recomendedAreaDisplay ? (
            <ScrollView style={styles.recomendedArea}>
              {filteredCity.map(city => (
                <Text
                  style={styles.recomendedCity}
                  onPressIn={() => setHandleCity(city)}
                  onPress={() => getWeather()}
                  onPressOut={() => setRecomendedAreaDisplay(false)}
                  key={city}>
                  {city}
                </Text>
              ))}
            </ScrollView>
          ) : (
            <View>
              <Text>as</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  SafeAreaStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherArea: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    width: '85%',
    height: 600,
    marginVertical: 50,
    position: 'relative',
  },
  searchArea: {
    height: 45,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  searchImage: {
    width: 24,
    height: 24,
  },
  searchInput: {
    height: 30,
    width: '85%',
    color: 'rgba(256,256,256,0.8)',
    fontSize: 16,
    letterSpacing: 1.3,
    fontWeight: '300',
  },
  recomendedArea: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  recomendedCity: {
    width: '100%',
    height: 30,
    color: 'rgba(256,256,256,0.8)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    letterSpacing: 1.1,
    fontWeight: '300',
  },
});

function mapStateToProps(state) {
  return {
    citiesReducer: state.citiesReducer,
    changeCurrentCityWeatherReducer: state.changeCurrentCityWeatherReducer,
  };
}

const mapDispatchToProps = {changeCurrentCityWeather};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
