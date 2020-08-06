import { connect } from "react-redux";
import QRScanerScreenComponent from "./QRScanerScreen";

import { checkPresence } from "./actions";

const mapStateToProps = state => ({
  success: state.qr.success,
  fail: state.qr.fail,
});

const mapDispatchToProps = {
  checkPresence,
};

export const QRScanerScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(QRScanerScreenComponent);