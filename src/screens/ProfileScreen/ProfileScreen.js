import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";

import { Button } from "react-native-elements";

import { Header } from "../../components";

import { colors, QR_SCANER_SCREEN } from "../../constants";

import { PresenceCheckNetworkRequest, getProfileNetworkRequest } from "../../networkers";

import { getUserToken, getUserPresence } from "../../utils";

export default class ProfileScreen extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      scanned: false,
      profileData: {},
      refreshing: false,
      presence: "",
    };
  }

  async componentDidMount() {
    const token = await getUserToken();
    const userPresence = await getUserPresence();
    const Id = 100000;
    
    const response = await getProfileNetworkRequest(Id, token);
    this.setState({ profileData: response, presence: userPresence });
  }

  renderModalConfirm = () => {
    Alert.alert("Вы уверены, что хотите выйти?", "", [
      { text: "Нет", onPress: () => {}, style: "cancel" },
      { text: "Да", onPress: () => this.props.logOut() }
    ]);
  }

  handleSuccessScan = async () => {
    this.setState({ scanned: true });
    // await this.props.successfulCheck();
  }

  handleFailureScan = () => {
    this.setState({ scanned: false });
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });

    const token = await getUserToken();
    const userPresence = await getUserPresence();
    const Id = 100000;

    const response = await getProfileNetworkRequest(Id, token);
    this.setState({ profileData: response, presence: userPresence });;

    this.setState({ refreshing: false });
  }

  render() {
    const { scanned, profileData, presence } = this.state;

    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        refreshControl={
          <RefreshControl
            title="Потяните вниз, чтобы обновить"
            titleColor={colors.textColorSecondary}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <View style={styles.avatarContainer}>
          <Image style={scanned || presence ? styles.scanAvatar : styles.avatar} source={require("../../../assets/avatar.png")}/>
          {
            scanned || presence
            ? <Image style={styles.checkStyle} source={require("../../../assets/confirm.png")}/>
            : null
          }
        </View>
        <View>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{profileData.firstName} {profileData.lastName}</Text>
            {/* <Text style={styles.info}>UX Designer / Mobile developer</Text> */}
            {
              !scanned && !presence
              ? (
                <>
                  <Text style={styles.confirmFalseBtn}>Необходимо подтвердить присутствие</Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate(QR_SCANER_SCREEN, {
                      handleSuccessScan: this.handleSuccessScan,
                      handleFailureScan: this.handleFailureScan,
                    })}
                    style={{ paddingBottom: 10, paddingTop: 5 }}
                  >
                    <Text style={styles.info}>Подтвердить присутствие</Text>
                  </TouchableOpacity>
                </>
              )
              : <Text style={styles.confirmTrueBtn}>Потдверждено!</Text>
            }
              
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
              source={require("../../../assets/logout.png")}
              style={styles.iconSettings}
          />
          <Button 
              title="Выйти"
              type="clear"
              buttonStyle={{
                marginBottom: 20,
                marginLeft: Platform.OS==="android" ? 10 : 0,
              }}
              titleStyle={{ color: colors.headerSecondary }}
              onPress={this.renderModalConfirm}
          />
        </View>
      </ScrollView>
    );
  }
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: colors.colorPrimary,
      marginTop: Platform.OS==="ios" ? 20 : 0
    },
    headerTitle: <Header color="white" title="Профиль" />,
    // headerRight: <HeaderRightButton navigation={navigation} />
});

const styles = StyleSheet.create({
  header:{
    backgroundColor: colors.headerSecondary,
    height: 100,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkStyle: {
    tintColor: "#00FF00",
    width: 30,
    height: 30,
    marginLeft: 10,
    // marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 73,
    borderWidth: 2,
    marginTop: 25,
  },
  scanAvatar: {
    width: 150,
    height: 150,
    borderRadius: 73,
    borderWidth: 2,
    marginTop: 25,
    marginLeft: 30,
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: "600",
  },
  bodyContent: {
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description: {
    fontSize:16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  iconSettings: {
    width: 28,
    height: 28,
    marginTop: 5,
    tintColor: colors.headerSecondary,
  },
  confirmTrueBtn: {
    color: "#00FF00",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
  confirmFalseBtn: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
});