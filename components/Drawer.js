import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import WeatherPage from '../screens/WeatherPage';
import LogInPage from '../screens/LogInPage';
import SignUpPage from '../screens/SignUpPage';
import SettingsPage from '../screens/SettingsPage';
import {connect} from 'react-redux';
import {changeLoggedUserActions} from '../redux/actions/changeLoggedUserActions';

const drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const user = props.data.user;
  const [loggedIn, setLoggedIn] = useState(user === '' ? false : true);
  useEffect(() => {
    setLoggedIn(user === '' ? false : true);
  }, [user]);
  return (
    <View style={styles.drawer}>
      <DrawerContentScrollView {...props}>
        <SafeAreaView>
          <View>
            {loggedIn ? (
              <View style={styles.userArea}>
                <Text style={styles.userNameText}>
                  {user === '' ? 'hata' : user.name + ' ' + user.surname}
                </Text>
                <TouchableOpacity>
                  <Image
                    style={styles.logoutIcon}
                    source={require('../assets/icons/log-out.png')}></Image>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.userArea}>
                <Text style={styles.userNameText}>You are not log in.</Text>
              </View>
            )}

            <DrawerItemList {...props} />
          </View>
        </SafeAreaView>
      </DrawerContentScrollView>
      <SafeAreaView>
        <Text style={styles.drawerInfo}>created by mircos</Text>
      </SafeAreaView>
    </View>
  );
};

const Drawer = ({navigation, loggedUser}) => {
  console.log(loggedUser);
  const [loggedIn, setLoggedIn] = useState(loggedUser === '' ? false : true);
  useEffect(() => {
    setLoggedIn(loggedUser === '' ? false : true);
  }, [loggedUser]);

  return (
    <drawer.Navigator
      drawerContent={props => (
        <CustomDrawer {...props} data={{user: loggedUser}} />
      )}
      initialRouteName="WeatherPage"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          color: 'rgb(0,0,0)',
        },
        drawerInactiveTintColor: '#313131',
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: 'rgb(161,162,187)',
      }}>
      <drawer.Screen name="Weather" component={WeatherPage} />
      {loggedIn ? (
        <drawer.Screen name="Settings" component={SettingsPage} />
      ) : (
        <drawer.Group>
          <drawer.Screen name="Log In" component={LogInPage} />
          <drawer.Screen name="Sign Up" component={SignUpPage} />
        </drawer.Group>
      )}
    </drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    height: '100%',
  },
  drawerInfo: {
    marginLeft: 20,
    fontSize: 12,
    color: '#313131',
  },
  logoutIcon: {
    width: 36,
    height: 36,
  },
  userArea: {
    height: 80,
    backgroundColor: 'rgb(161,162,187)',
    margin: 10,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 22,
    color: '#fff',
    maxWidth: 150,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    overflow: 'scroll',
  },
});

function mapStateToProps(state) {
  return {
    loggedUser: state.changeLoggedUserReducer,
  };
}

const mapDispatchToProps = {changeLoggedUserActions};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
