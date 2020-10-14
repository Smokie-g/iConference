import React, { PureComponent } from "react";
import {
  Text,
  Platform,
  View,
  StyleSheet,
} from "react-native";

import { colors } from "../../constants";
import { HeaderWithArrowBtn, HeaderLeftButton } from "../../components";
import { Item } from "native-base";

class ReportsDetailScreen extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      name: props.navigation.state.params.name,
      id: props.navigation.state.params.id,
      subSectionId: props.navigation.state.params.subSectionId,
      speakers: props.navigation.state.params.speakers,
      dateStart: props.navigation.state.params.dateStart,
      dateEnd: props.navigation.state.params.dateEnd,
      duration: props.navigation.state.params.duration,
      idInSubsection: props.navigation.state.params.idInSubsection,
    };
  }

  render() {
    const {
      name,
      id,
      subSectionId,
      speakers,
      dateStart,
      dateEnd,
      duration,
      idInSubsection,
    } = this.state;

    const speaker = speakers.find(item => item.id);

    const monthStart =
      new Date(dateStart).getMonth() + 1 >= 9
        ? new Date(dateStart).getMonth() + 1
        : `0${new Date(dateStart).getMonth() + 1}`;

    const monthEnd =
      new Date(dateEnd).getMonth() + 1 >= 9
        ? new Date(dateEnd).getMonth() + 1
        : `0${new Date(dateEnd).getMonth() + 1}`;

    return (
      <View style={{ flex: 1, backgroundColor: colors.textColorPrimary }}>
          <View style={{
            // flex: 1,
            //backgroundColor: colors.bgPrice,
            padding: 30,
          }}>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </View>
          <View style={styles.containerStyle}>
            {
              speaker ? (
                <Text
                  style={styles.textStyle}
                >
                  Спикеры: {speaker.lastName} {speaker.firstName[0]}. {speaker.middleName[0]}.
                </Text>
              ) : null
            }
            {/* <Text style={styles.textStyle}>
              {`Начало: ${new Date(dateStart).getDate()}.${monthStart}.${new Date(dateStart).getFullYear()}`}
            </Text>
            <Text style={styles.textStyle}>
              {`Окончание: ${new Date(dateEnd).getDate()}.${monthEnd}.${new Date(dateEnd).getFullYear()}`}
            </Text> */}
            <Text style={styles.textStyle}>{`Продол-ть: ${duration} мин.`}</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                paddingTop: 30,
                paddingBottom: 10,
              }}
            >
              Аннтоация
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: "left",
                marginLeft: 15,
              }}
            >
              Некоторый текст, описывающий краткое содержание доклада
            </Text>
          </View>
      </View>
    );
  }
}

ReportsDetailScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: colors.headerSecondary,
    marginTop: Platform.OS==="ios" ? 20 : 0
  },
  headerTitle: <HeaderWithArrowBtn color="white" title="Доклады" />,
  headerLeft: <HeaderLeftButton navigation={navigation} />
});

export default ReportsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.bgPrice,
    shadowOffset: { width: 5, height: 0 },
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    shadowOffset: { width: 5, height: 0 },
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  settings: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  containerStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
  },
});