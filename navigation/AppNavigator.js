import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from '../screens/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateUpdateGoal from '../screens/Goals/CreateUpdateGoal';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Authentication/Login';
import Signup from '../screens/Authentication/Signup';
import { customTheme } from '../utilities/theme';
import { getLoginStatus, getToken } from '../config/storageCOnfig,';
import IndividualGoal, { IndividualGoalScreenOptions } from '../screens/Goals/IndividualGoal';
import { fetchToken } from '../utilities/utils';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: customTheme.colors.primary,
  },
  headerTitleStyle: {
    marginLeft: -10,
    marginRight: 10,
    fontWeight: 'bold',
  },
  headerTintColor: "white",
};

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {

  const [loginStatus, setLoginStatus] = React.useState(null);

  const checkLoginStatus = async () => {
    const isLoggedIn = await getToken();
    console.log("loginStatus", isLoggedIn);
    setLoginStatus(isLoggedIn)
  }

  React.useEffect(() => {
    checkLoginStatus()
  }, [])
  console.log("loginStatus", loginStatus);

  return (
    <Stack.Navigator >
      <Stack.Screen name="All Goals" component={loginStatus ? HomePage : Login} />
      <Stack.Screen name="Add Goal" component={CreateUpdateGoal} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Goal" component={IndividualGoal} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="All Goals" screenOptions={defaultNavOptions}>
        <Drawer.Screen name="Home" component={AppNavigator} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default DrawerNavigator;