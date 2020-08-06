import React, { Component } from 'react';
import { YellowBox, StatusBar, View, StyleSheet, Platform } from "react-native";
import { ScreenOrientation, AppLoading } from "expo";
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import combinedReducers from "./src/store";
import { RootScreen } from "./src/screens";

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const store = createStore(
  combinedReducers,
  {},
  applyMiddleware(ReduxThunk)
);

YellowBox.ignoreWarnings(["Require cycle:"]);

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
});

export default class App extends Component {

  state = {
    isReady: false
  };

  loadAsync = async () => {
    /*eslint-disable*/
    await Promise.all([
      Font.loadAsync({
        'Ionicons': Ionicons,
        'Material Icons': MaterialIcons,
        'MaterialIcons': MaterialIcons,
      }),
      Asset.loadAsync([
        require('./assets/download-arrow.png'),
        require('./assets/icon.png'),
        require('./assets/image.png'),
        require('./assets/logout.png'),
        require('./assets/new_splash.png'),
        require('./assets/new-splash.png'),
        require('./assets/notifications.png'),
        require('./assets/pricelist-svg.png'),
        require('./assets/splash.png'),
        require('./assets/arrow-right.png'),
      ])
    ]);
  };
  render() {
    const { isReady } = this.state;

    /* if (!isReady) {
      return (
        <AppLoading
          startAsync={this.loadAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    } */

    return (
      <Provider store={store}>
        {Platform.OS === "ios" ? (
          <AppStatusBar
            barStyle="dark-content"
          />
        ) : null}
        <RootScreen />
      </Provider>
    );
  }
}
