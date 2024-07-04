import React from 'react';
import DrawerNavigator, { AppNavigator } from './navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import theme from './utilities/theme';
import { AuthProvider } from './screens/Authentication/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}
