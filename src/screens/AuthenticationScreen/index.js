import { connect } from "react-redux";
import AuthenticationScreenComponent from "./AuthenticationScreen";

import { logIn } from "./actions";
import { getUserTokenRequest, getUserTokenSuccess } from "../../actions";

const mapStateToProps = state => ({
    token: state.auth.accessToken,
    authError: state.auth.error,
});
  
const mapDispatchToProps = {
    getUserTokenRequest,
    getUserTokenSuccess,
    logIn,
};

export const AuthenticationScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationScreenComponent);