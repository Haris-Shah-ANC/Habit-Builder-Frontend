import React from 'react';
import DrawerNavigator from './navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import theme from './utilities/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <DrawerNavigator />
    </PaperProvider>
  );
}
