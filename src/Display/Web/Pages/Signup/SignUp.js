//Rest Auth Api
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/auth";
import { Form, FormControl } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { Divider } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import GoogleBtn from "./../Oauth/google";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      show_password: false,
      errors: {
        fullName: "",
        email: "",
        password1: "",
        password2: "",
      },
    };
  }
  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.next();
    }
  }
  handlesubmit = (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      this.props.onAuth(
        this.state.username,
        this.state.email,
        this.state.password1,
        this.state.password2
      );
    }
  };
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password1":
        errors.password1 =
          value.length < 8
            ? "Password must be at least 8 characters long!"
            : "";
        break;
      case "password2":
        errors.password2 =
          value !== this.state.password1 ? "The Passwords must match" : "";
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };
  handleShowPassword = () => {
    this.setState({ show_password: !this.state.show_password });
  };
  render() {
    const valid = validateForm(this.state.errors);
    console.log(this.props);
    return (
      <div className="login-anchor">
        <Paper elevation="3" className="p-4 login-paper">
          <Helmet>
            <title>Signup</title>
            <meta
              name="description"
              content="Welcome to Elitemanga. Signup to enjoy all features"
            />
          </Helmet>
          <Divider horizontal>
            <h3>Signup</h3>
          </Divider>
          <form className="signup-form" noValidate autoComplete="off">
            <TextField
              fullWidth
              required
              id="username"
              name="username"
              label="Username"
              error={this.props.error.username !== ""}
              helperText={this.props.error.username}
              value={this.state.username}
              onChange={this.handleChange}
            />

            <TextField
              required
              fullWidth
              error={
                this.state.errors.email !== "" || this.props.error.email !== ""
              }
              helperText={this.state.errors.email + this.props.error.email}
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
              error={this.state.errors.password1 !== ""}
              helperText={this.state.errors.password1}
              id="password1"
              name="password1"
              label="Password"
              type={this.state.show_password ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
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
                  </InputAdornment>
                ),
              }}
              value={this.state.password1}
              onChange={this.handleChange}
            />

            <TextField
              required
              id="password2"
              fullWidth
              error={this.state.errors.password2 !== ""}
              helperText={this.state.errors.password2}
              name="password2"
              type={this.state.show_password ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
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
                  </InputAdornment>
                ),
              }}
              label="Retype Password"
              value={this.state.password2}
              onChange={this.handleChange}
            />

            <Button
              disabled={!valid}
              onClick={this.handlesubmit}
              variant="contained"
              color="primary"
              fullWidth
              className="mt-2"
              type="submit"
            >
              Signup
            </Button>
          </form>
          <div className="login-options mt-3">
            <GoogleBtn />
          </div>
          <div className="sign-login text-center">
            <p className="text-muted login-text text-center">
              Already a member?{" "}
              <span>
                <Link className="no-blue" to="/login/">
                  Log In
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
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
