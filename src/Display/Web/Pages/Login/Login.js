//Rest Auth Api
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/auth";
import { Form, FormControl } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import GoogleBtn from "./../Oauth/google";
import FacebookBtn from "./../Oauth/facebook";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      email_error: "",
      show_password: false,
    };
  }
  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  handlesubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password);
  };
  handleShowPassword = () => {
    this.setState({ show_password: !this.state.show_password });
  };
  handleChange = (event) => {
    var email = validEmailRegex.test(event.target.value)
      ? ""
      : "Email is not valid!";
    this.setState({
      email: event.target.value,
      email_error: email,
    });

    console.log(this.state);
  };
  handleChangeTwo = (event) => {
    this.setState({
      password: event.target.value,
    });
    console.log(this.state);
  };
  render() {
    console.log(this.props.error);
    return (
      <div className="login-anchor">
        <Paper elevation="3" className="p-4 login-paper">
          <Helmet>
            <title>Login</title>
            <meta
              name="description"
              content="Login to access your stored manga data"
            />
          </Helmet>
          <Divider horizontal>
            <h3 className="need-theme">Login</h3>
          </Divider>
          <form className="signup-form" noValidate>
            <TextField
              required
              fullWidth
              error={
                this.props.error.non_field_errors !== "" ||
                this.state.email_error !== ""
              }
              helperText={this.state.email_error}
              id="email"
              name="email"
              label="E-mail"
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
            />
            <TextField
              required
              fullWidth
              error={this.props.error.non_field_errors !== ""}
              id="password1"
              name="password1"
              label="Password"
              type={this.state.show_password ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Toggle Visibility">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleShowPassword}
                      >
                        {this.state.show_password ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              value={this.state.password}
              onChange={this.handleChangeTwo}
            />
            {this.props.error.non_field_errors !== "" && (
              <div className="text-danger">
                {this.props.error.non_field_errors}
              </div>
            )}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="mt-3"
              disabled={this.state.email_error !== ""}
              onClick={this.handlesubmit}
              type="submit"
            >
              Login
            </Button>{" "}
          </form>
          <div className="text-center mt-3 chameleon">Or Login with</div>
          <div className="login-options">
            <GoogleBtn />
            <FacebookBtn />
          </div>
          <div className="sign-login text-center">
            <p className="text-muted login-text text-center">
              Not a member?{" "}
              <span>
                <Link className="no-blue" to="/signup/">
                  Sign up Now
                </Link>
              </span>
            </p>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
