import React, { PureComponent } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Alert,
  Image,
  RefreshControl,
} from "react-native";
import { Button } from "react-native-elements";

import { colors, SECTION_SCREEN } from "../../constants";
import { Header, HeaderRightButton, Conference } from "../../components";
import { Separator } from "./components";
import { getConferenceNetworkRequest } from "../../networkers";

class MainScreen extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      conference: [],
      userId: props.navigation.state.params.userId,
      refreshing: false,
    };
  }

  async componentDidMount() {
    const res = await getConferenceNetworkRequest();
    this.setState({ conference: res });
  }

  renderModalConfirm = () => {
    Alert.alert("Вы уверены, что хотите выйти?", "", [
      { text: "Нет", onPress: () => {}, style: "cancel" },
      { text: "Да", onPress: () => this.props.logOut() }
    ]);
  }

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        activeOpacity={0.4}
        style={styles.settings}
        underlayColor="#44454a"
        onPress={() => {this.props.navigation.navigate(SECTION_SCREEN, {
          userId: this.state.userId,
          conferenceId: item.id,
          conferenceName: item.name,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          place: item.place,
        })}}
      >
        <View>
          <Conference
            name={item.name}
            dateStart={item.dateStart}
            dateEnd={item.dateEnd}
            place={item.place}
          />
        </View>
      </TouchableHighlight>
    );
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });

    const newRes = await getConferenceNetworkRequest();
    this.setState({ conference: newRes });

    this.setState({ refreshing: false });
  }

  render() {
    const { conference } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={conference}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <Separator />}
          refreshControl={
            <RefreshControl
              title="Потяните вниз, чтобы обновить"
              titleColor={colors.textColorSecondary}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          ListFooterComponent={<View style={{ paddingBottom: 10 }} />}
        />
      </View>
    );
  }
}

MainScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: colors.headerSecondary,
    marginTop: Platform.OS==="ios" ? 20 : 0
  },
  headerTitle: <Header color="white" title="Конференции" />,
  // headerRight: <HeaderRightButton navigation={navigation} />
});

export default MainScreen;

const styles = StyleSheet.create({
  iconList: {
    fontSize: 27,
    marginRight: 12,
    color: "#8a8c9c"
  },
  iosHeaderCenter: {
    height: "100%",
    alignItems: "center",
    marginBottom: 5
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    paddingTop: 30,
    paddingBottom: 25,
    marginLeft: 10,
  },
  settings: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  iconSettings: {
    width: 28,
    height: 28,
    marginTop: 5,
    // marginBottom:Platform.OS==="ios" ? 20 : 0,
    tintColor: colors.headerSecondary,
  },
});