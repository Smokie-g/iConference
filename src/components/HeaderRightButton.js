import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { AUTHENTICATION_SCREEN } from '../constants';

export const HeaderRightButton = ({ navigation }) => {

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(AUTHENTICATION_SCREEN)}
      >
        <Image
          source={require('../../assets/logout.png')}
          style={styles.settings}
        />
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  settings: {
    width: 28,
    height: 28,
    marginRight: 25,
    marginBottom:Platform.OS==="ios" ? 20 : 0,
    tintColor: "white",
  },
  iosHeaderCenter: {
    height: "100%",
    alignItems: "center",

  }
});
