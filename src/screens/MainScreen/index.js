import { connect } from "react-redux";
import MainScreenComponent from "./MainScreen";

import { logOut } from "./actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  logOut,
};

export const MainScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainScreenComponent);