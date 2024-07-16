import React from 'react';
import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
import ConnectAccount from '../screens/Authentication/ConnectAccount';
import Register from '../screens/Authentication/Register';
import ForgotPassword from '../screens/Authentication/ForgotPassword';
import ResetPassword from '../screens/Authentication/ResetPassword';

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

  const config = {
    screens: {
      "Login": {
        path: `login/`,
        parse: {
          token: (token) => token,
        },
        stringify: {
          token: (token) => token,
        },
      },
      // TODO : replace the path with actual path
      "Signup": {
        path: `auth/sign-up/`,
        parse: {
          token: (token) => token,
        },
        stringify: {
          token: (token) => token,
        },
      },
      // TODO : replace the path with actual path and parsing method to get token and id
      "ResetPassword": {
        path: `password/confirm/`,
        parse: {
          token: (token) => token,
        },
        stringify: {
          token: (token) => token,
        },
      },
    },
  };

  const linking = {

    prefixes: ["http://example.in", "http://example.com", "https://example.com", "https://example.in"],
    config,
    // Custom function to get the URL which was used to open the app
    async getInitialURL() {
      // First, you would need to get the initial URL from your third-party integration
      // The exact usage depend on the third-party SDK you use
      // For example, to get to get the initial URL for Firebase Dynamic Links:
      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();
      return url;
    },

    // Custom function to subscribe to incoming links
    subscribe(listener) {

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
        listener(url);
        //  console.log("Redirect url", url);
      });

      return () => {
        // Clean up the event listeners
        linkingSubscription.remove();
      };
    }
  };

  return (
    <GestureHandlerRootView>
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={defaultNavOptions}>
          {status === "true" ? (
            <>
              <Stack.Screen name="Home Pages" component={DrawerNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="HomePage" component={HomePage} />
              <Stack.Screen name="Add Goal" component={CreateUpdateGoal} />
              <Stack.Screen name="Goal" component={IndividualGoal} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="ConnectAccount" component={ConnectAccount} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
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