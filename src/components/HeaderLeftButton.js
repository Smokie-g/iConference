import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
export const HeaderLeftButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
    >
      <Image
        source={require('../../assets/left-arrow.png')}
        style={styles.settings}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settings: {
    width: 28,
    height: 28,
    marginLeft: 25,
    marginBottom: Platform.OS === "ios" ? 20 : 0,
    tintColor: "white",
  },
  iosHeaderCenter: {
    height: "100%",
    alignItems: "center",
  },
});
