import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  AsyncStorage,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

import { Spinner, HeaderWithArrowBtn, HeaderLeftButton } from "../../components";
import { colors, PROFILE_SCREEN } from "../../constants";

const { width } = Dimensions.get('window');
const qrSize = width * 0.8;

export default class QRScanerScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    loading: false,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = async ({ data }) => {
    this.setState({ scanned: true });
    const { checkPresence } = this.props;
    
    await checkPresence(data);

    this.props.success === "OK"
      ? Alert.alert("Пользователь 100000 успешно подтвержден!", "", [
        { text: "OK", onPress: () => {
          this.setState({ scanned: false });
          this.props.navigation.state.params.handleSuccessScan();
          this.props.navigation.navigate(PROFILE_SCREEN);
        }},
      ])
      : Alert.alert("Не корректные данные!", "Попробуйте еще раз или обратитесь за помощью.", [
        { text: "OK", onPress: () => {
          this.setState({ scanned: false });
          this.props.navigation.state.params.handleFailureScan();
          this.props.navigation.navigate(PROFILE_SCREEN);
        }},
      ])
  };

  render() {
    const { hasCameraPermission, loading } = this.state;

    if (loading) {
      return <Spinner />;
    };

    if (hasCameraPermission === null) {
      return <Text>Запрос разрешения на камеру</Text>;
    };
    if (hasCameraPermission === false) {
      return <Text>Нет доступа к камере</Text>;
    };
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <Image 
            style={styles.qrFrame}
            source={require('../../../assets/focus1.png')}
          />
          {<Text style={styles.qrText}>Наведите камеру на QR-код</Text>}
        </BarCodeScanner>
      </View>
    );
  }
}

QRScanerScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <HeaderWithArrowBtn color="white" title="QR-сканер" />,
  headerStyle: {
    backgroundColor: colors.colorPrimary,
    marginTop: Platform.OS === "ios" ? 20 : 0,
    shadowColor: "transparent",
    shadowRadius: 0,
    shadowOffset: {
    height: 0
  },
    elevation: 0,
    borderBottomWidth: 0
  },
  headerLeft: <HeaderLeftButton navigation={navigation} />
});
  
const styles = StyleSheet.create({
  arrowBack: {
    fontSize: 30,
    marginLeft: 25,
    color: "white"
  },
  iosHeaderCenter: {
    height: "100%",
    alignItems: "center",
    marginBottom: 5
  },
  qrFrame: {
    marginTop: "20%",
    marginBottom: "10%",
    marginLeft: "10%",
    width: qrSize,
    height: qrSize,
    tintColor: "white",
    opacity: 0.8,
  },
  qrText : {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20%",
  },
  againText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  fingerStyle: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginBottom: 20,
  },
});