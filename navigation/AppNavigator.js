import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomePage from '../screens/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateUpdateGoal from '../screens/Goals/CreateUpdateGoal';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Authentication/Login';
import Signup from '../screens/Authentication/Signup';
import { customTheme } from '../utilities/theme';
import IndividualGoal, { IndividualGoalScreenOptions } from '../screens/Goals/IndividualGoal';
import { useAuth } from '../screens/Authentication/AuthProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawer from './CustomDrawer';

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
  const { authState, clearLoginDetails } = useAuth();
  const { status, token } = authState;

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultNavOptions}>
          {status === "true" ? (
            <>
              <Stack.Screen name="Home Pages" component={DrawerNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="All Goals" component={HomePage} />
              <Stack.Screen name="Add Goal" component={CreateUpdateGoal} />
              <Stack.Screen name="Goal" component={IndividualGoal} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={defaultNavOptions}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <CustomDrawer />
            </SafeAreaView>
          </View>
        )
      }}
    >
      <Drawer.Screen name="Home Page" component={HomePage} />
      {/* <Drawer.Screen name="Login" component={Login} /> */}
      {/* <Drawer.Screen name="Signup" component={Signup} /> */}
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;