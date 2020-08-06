import { connect } from "react-redux";
import NewsScreenComponent from "./NewsScreen";

const mapStateToProps = state => ({
    token: state.auth.accessToken,
});

const mapDispatchToProps = {};

export const NewsScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsScreenComponent);