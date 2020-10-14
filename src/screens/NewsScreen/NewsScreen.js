import React, { PureComponent } from "react";
import { View, Text, Platform, StyleSheet, FlatList, RefreshControl } from "react-native";

import { Button, Card, Divider } from 'react-native-elements';

import { colors } from "../../constants";
import { Header } from "../../components";
import { Separator } from "../MainScreen/components";
import { getNewsNetworkRequest } from "../../networkers";
import { getUserToken } from "../../utils";

const defaultImg =
'https://compote.slate.com/images/dcf77d70-f4d7-4cb2-bba5-97df12da7db1.jpg';

class NewsScreen extends PureComponent {
  state = {
    content: [],
    refreshing: false,
  };

  async componentDidMount() {
    const token = await getUserToken();
    const res = await getNewsNetworkRequest(token);
    this.setState({ content: res });
  }

  renderNewsItem = (item) => {
    const month =
      new Date(item.item.time).getMonth() + 1 >= 9
        ? new Date(item.item.time).getMonth() + 1
        : `0${new Date(item.item.time).getMonth() + 1}`;

    return (
      <View>
        <Card
          featuredTitle={item.item.title}
          featuredTitleStyle={styles.featuredTitleStyle}
          // image={{ uri: defaultImg }}
        >
          <Text style={{ marginBottom: 10 }}>
            {item.item.body}
          </Text>
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={styles.noteStyle}
            >
              {new Date(item.item.time).getDate()}.{month}.{new Date(item.item.time).getFullYear()}
            </Text>
          </View>
        </Card>
      </View>
    )
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });

    const token = await getUserToken();
    const res = await getNewsNetworkRequest(token);
    this.setState({ content: res });

    this.setState({ refreshing: false });
  }

  render() {
    const { content } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={styles.textStyle}>Список новостей</Text>
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={content}
          renderItem={this.renderNewsItem}
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

NewsScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: colors.headerSecondary,
    marginTop: Platform.OS==="ios" ? 20 : 0
  },
  headerTitle: <Header color="white" title="Новости" />,
});

const styles = StyleSheet.create({
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    paddingTop: 30,
    paddingBottom: 25,
    marginLeft: 10,
  },
  noteStyle: {
    margin: 5,
    fontStyle: "italic",
    color: "#b2bec3",
    fontSize: 10
  },
});

export default NewsScreen;