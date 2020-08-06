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

import { getReportsNetworkRequest } from "../../networkers";
import { colors, REPORTS_DETAIL_SCREEN } from "../../constants";
import { HeaderWithArrowBtn, HeaderLeftButton, Reports } from "../../components";
import { Separator } from "../MainScreen/components";

class ReportsScreen extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            sectionId: props.navigation.state.params.subSectionId,
            sectionName: props.navigation.state.params.subSectionName,
            dateStart: props.navigation.state.params.dateStart,
            dateEnd: props.navigation.state.params.dateEnd,
            place: props.navigation.state.params.place,
            reports: [],
            refreshing: false,
        };
    }

    async componentDidMount() {
        const { sectionId } = this.state;
        const res = await getReportsNetworkRequest(sectionId);
        
        this.setState({ reports: res });
    }

    renderItem = ({ item }) => {
        return (
            <TouchableHighlight
                activeOpacity={0.4}
                style={styles.settings}
                underlayColor="#44454a"
                onPress={() => {this.props.navigation.navigate(REPORTS_DETAIL_SCREEN, {
                    name: item.name,
                    id: item.id,
                    subSectionId: item.subSectionId,
                    idInSubsection: item.idInSubsection,
                    duration: item.duration,
                    speakers: item.speakers,
                    dateStart: this.state.dateStart,
                    dateEnd: this.state.dateEnd,
                    place: this.state.place,
                })}}
            >
                <View>
                    <Reports
                        name={item.name}
                        info={item.duration}
                    /> 
                </View>
            </TouchableHighlight>
        );
    }

    onRefresh = async() => {
        this.setState({ refreshing: true });

        const { sectionId } = this.state;
        const newRes = await getReportsNetworkRequest(sectionId);
        this.setState({ reports: newRes });

        this.setState({ refreshing: false });
    }

    render() {
        const { reports, sectionName } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.textStyle}>{sectionName}</Text>
                <FlatList
                    style={{ flex: 1, width: "100%" }}
                    data={reports}
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

ReportsScreen.navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: colors.headerSecondary,
      marginTop: Platform.OS==="ios" ? 20 : 0
    },
    headerTitle: <HeaderWithArrowBtn color="white" title="iConference" />,
    headerLeft: <HeaderLeftButton navigation={navigation} />
});

export default ReportsScreen;


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