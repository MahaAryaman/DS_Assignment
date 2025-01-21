import * as React from 'react';
import {AppProvider} from './src/context/AppProvider';
import SafeAreaComponent from './src/components/SafeAreaComponent';

const App = () => {
  return (
    <AppProvider>
      <SafeAreaComponent edges={['top', 'right', 'left']}></SafeAreaComponent>
    </AppProvider>
  );
};

export default App;

