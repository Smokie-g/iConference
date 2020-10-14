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

import { colors, REPORTS_SCREEN } from "../../constants";
import { HeaderWithArrowBtn, HeaderLeftButton, SubSection } from "../../components";
import { Separator } from "../MainScreen/components";
import { getSubSectionsNetworkRequest } from "../../networkers";

class SubSectionScreen extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      sectionId: props.navigation.state.params.sectionId,
      sectionName: props.navigation.state.params.sectionName,
      dateStart: props.navigation.state.params.dateStart,
      dateEnd: props.navigation.state.params.dateEnd,
      place: props.navigation.state.params.place,
      conferenceName: props.navigation.state.params.conferenceName,
      subSections: [],
      refreshing: false,
    };
  }

  async componentDidMount() {
    const { sectionId } = this.state;
    const res = await getSubSectionsNetworkRequest(sectionId);
    this.setState({ subSections: res });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        activeOpacity={0.4}
        style={styles.settings}
        underlayColor="#44454a"
        onPress={() => {this.props.navigation.navigate(REPORTS_SCREEN, {
          subSectionId: item.id,
          sectionId: item.sectionId,
          subSectionName: item.description,
          dateStart: this.state.dateStart,
          dateEnd: this.state.dateEnd,
          place: this.state.place,
        })}}
      >
        <View>
          <SubSection
            name={item.description}
            reportsCount={item.reportsId.length}
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
    const { subSections, conferenceName } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.textStyle}>{conferenceName}</Text>
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={subSections}
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

SubSectionScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: colors.headerSecondary,
    marginTop: Platform.OS==="ios" ? 20 : 0,
  },
  headerTitle: <HeaderWithArrowBtn color="white" title="iConference" />,
  headerLeft: <HeaderLeftButton navigation={navigation} />
});

export default SubSectionScreen;


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