import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";

class Switcher extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.onTryGetManga();
  }

  render() {
    return (
      <Router>
        <BaseRouter />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onTryGetManga: () => dispatch(actions.getManga())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Switcher);
