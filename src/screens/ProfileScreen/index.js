import { connect } from "react-redux";

import ProfileScreenComponent from "./ProfileScreen";

import { successfulCheck } from "./actions";

import { logOut } from "../MainScreen/actions";

const mapStateToProps = state => ({
  success: state.qr.success,
  fail: state.qr.fail,
  status: state.profile.status,
});

const mapDispatchToProps = {
  logOut,
  successfulCheck,
};

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreenComponent);