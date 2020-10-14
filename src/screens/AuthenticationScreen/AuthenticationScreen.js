import React, { PureComponent } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  LayoutAnimation,
  StyleSheet,
  Platform,
  View,
  KeyboardAvoidingView,
  Text,
  Alert,
} from "react-native";

import { AuthHeader, Spinner, ArrowButton } from "../../components";
import { TextInput, Button } from "../../containers";
import { colors } from '../../constants';

import { getUserToken } from "../../utils";
import { MAIN_SCREEN } from "../../constants";

export default class AuthenticationScreen extends PureComponent {
  state = {
    userId: "",
    loading1: false,
    error: this.props.authError,
  };

  async componentDidMount() {
    const { getUserTokenRequest, getUserTokenSuccess, navigation } = this.props;

    this.setState({ loading1: true });
    getUserTokenRequest();
    const token = await getUserToken();
    getUserTokenSuccess();
    if (token) {
      navigation.navigate(MAIN_SCREEN, {
        userId: this.state.userId,
      });
    } else {
      this.setState({ loading1: false })
    }
  }

  renderModalConfirm = () =>
    Alert.alert("Exit", "", [
      { text: "No", onPress: () => {}, style: "cancel" },
      { text: "Yes", onPress: () => this.props.logOut() }
  ]);

  logIn = () => {
    this.setState({ loading1: true })
    const { userId, error } = this.state;
    const { logIn } = this.props;

    if (error) {
      this.setState({ userId: "" });
      this.setState({ loading1: false });
    }

    if (userId) {
      logIn(userId);
    } else {
      Alert.alert("Не корректные данные!");
      this.setState({ loading1: false });
      return;
    }
    this.setState({ loading1: false });
  };

  onFocus = () => {
    this.clearErrors();
  };

  onChangeEmail = userId => {
    const { userIdError } = this.state;
    if (userIdError) {
      this.clearErrors();
    }
    this.setState({ userId });
  };

  clearErrors = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ userIdError: false });
  };

  render() {
    const { userId, userIdError, loading1 } = this.state;

    if (loading1) {
      return <Spinner
        backgroundColor={colors.backgroundColorSecondary}
        color={colors.colorPrimary}/>;
    }
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{
          flex: 1,
          alignItems: "center",
          // marginTop: 10,
          justifyContent: "space-around"
        }}>
          <Text style={{
            fontSize: 18,
          }}>
            Добро пожаловать!
          </Text>
          <KeyboardAvoidingView style={{ alignItems: "center" }} behavior="position" keyboardVerticalOffset={80}>
            <TextInput
              ref={this.myTextInput}
              autoCorrect={false}
              placeholder="Введите Ваш id"
              showError={userIdError}
              errorText="Ошибка входа"
              keyboardType="number-pad"
              onChangeText={userId => this.setState({ userId })}
              onFocus={this.onFocus}
              returnKeyType="done"
              value={userId}
              style={{ borderBottomColor: colors.colorPrimary }}
            />
          </KeyboardAvoidingView>
          <View style={{
            marginBottom: 20
          }}>
            <ArrowButton onPress={this.logIn} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AuthenticationScreen.navigationOptions = {
  headerTitle: <AuthHeader title="iCONFERENCE" />,
  headerStyle: {
    backgroundColor: colors.colorPrimary,
    color: "white",
    marginTop: 25
  },
};
