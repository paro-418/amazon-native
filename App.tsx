/* eslint-disable prettier/prettier */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {ModalPortal} from 'react-native-modals';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import StackNavigator from './navigation/StackNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.ViewContainer]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
        <StackNavigator />
        <ModalPortal />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
  },
  Text: {
    color: 'black',
  },
});

export default App;
