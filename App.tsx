import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AppProvider} from './src/context/AppProvider';
import SafeAreaComponent from './src/components/SafeAreaComponent';

interface AppProps {}

const App = (props: AppProps) => {
  return (
    <AppProvider>
      <SafeAreaComponent edges={['top', 'right', 'left']}></SafeAreaComponent>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
});
