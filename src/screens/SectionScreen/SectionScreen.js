import React, { PureComponent } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Alert,
  RefreshControl,
} from "react-native";

import { colors, SUB_SECTION_SCREEN } from "../../constants";
import { HeaderWithArrowBtn, HeaderLeftButton, Section } from "../../components";
import { Separator } from "../MainScreen/components";
import { getSectionsNetworkRequest } from "../../networkers";

class SectionScreen extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      userId: props.navigation.state.params.userId,
      conferenceId: props.navigation.state.params.conferenceId,
      conferenceName: props.navigation.state.params.conferenceName,
      dateStart: props.navigation.state.params.dateStart,
      dateEnd: props.navigation.state.params.dateEnd,
      place: props.navigation.state.paramsplace,
      sections: [],
      refreshing: false,
    };
  }

  async componentDidMount() {
    const { conferenceId } = this.state;
    const res = await getSectionsNetworkRequest(conferenceId);
    this.setState({ sections: res });
 }

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        activeOpacity={0.4}
        style={styles.settings}
        underlayColor="#44454a"
        onPress={() => {this.props.navigation.navigate(SUB_SECTION_SCREEN, {
          sectionId: item.id,
          sectionName: item.description,
          dateStart: this.state.dateStart,
          dateEnd: this.state.dateEnd,
          place: this.state.place,
          conferenceName: this.state.conferenceName,
        })}}
      >
        <View>
          <Section
            name={item.description}
          />
        </View>
      </TouchableHighlight>
    );
  }

  onRefresh = async() => {
    this.setState({ refreshing: true });

    const { conferenceId } = this.state;
    const newRes = await getSectionsNetworkRequest(conferenceId);
    this.setState({ sections: newRes });

    this.setState({ refreshing: false });
  }

  render() {
    const { sections, conferenceName } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.textStyle}>{conferenceName}</Text>
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={sections}
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

SectionScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: colors.headerSecondary,
    marginTop: Platform.OS==="ios" ? 20 : 0,
  },
  headerTitle: <HeaderWithArrowBtn color="white" title="iConference" />,
  headerLeft: <HeaderLeftButton navigation={navigation} />
});

export default SectionScreen;


const styles = StyleSheet.create({
  iconList:{
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
});