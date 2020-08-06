import { AsyncStorage } from "react-native";

export const getUserToken = async () => {
  try {
    return await AsyncStorage.getItem("userToken");
  } catch (error) {
    console.log(error.message);
  }
};

export const saveUserToken = async userToken => {
  try {
    await AsyncStorage.setItem("userToken", userToken);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUserToken = async () => {
  try {
    await AsyncStorage.setItem("userToken", "");
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserPresence = async () => {
  try {
    return await AsyncStorage.getItem("userPresence");
  } catch (error) {
    console.log(error.message);
  }
};

export const saveUserPresence = async userPresence => {
  try {
    await AsyncStorage.setItem("userPresence", userPresence);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUserPeresence = async () => {
  try {
    await AsyncStorage.setItem("userPresence", "");
  } catch (error) {
    console.log(error.message);
  }
};