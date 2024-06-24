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

  return (
    <Stack.Navigator >
      <Stack.Screen name="All Goals" component={HomePage} />
      <Stack.Screen name="Add Goal" component={CreateUpdateGoal} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" screenOptions={defaultNavOptions}>
        <Drawer.Screen name="Home" component={AppNavigator} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default DrawerNavigator;