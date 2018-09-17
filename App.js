import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/store';
import AppNavigation from './src/navigation/AppNavigation';

console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated'];

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor={'#226a73'} />
          <AppNavigation />
        </PersistGate>
      </Provider>
    );
  }
}