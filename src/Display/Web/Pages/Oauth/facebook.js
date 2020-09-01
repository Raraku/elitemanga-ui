import React from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "./../../../../store/actions/auth";
import axiosConfig from "./../../../HOC/axiosConfig";

class FacebookBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: "",
      accessToken: "",
    };
  }
  login = (response) => {
    console.log(response);
    var form_data = new FormData();
    form_data.append("access_token", response.accessToken);
    form_data.append("code", "");
    if (response.accessToken) {
      axios
        .post("/rest-auth/facebook/", form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          const expirationDate = new Date(new Date().getTime() + 3600 * 100000);
          localStorage.setItem("token", res.data.key);
          localStorage.setItem("expirationDate", expirationDate);
          this.props.authSuccess(res.data.key);
          axiosConfig.patch("/profile/", {
            social_avatar: `https://graph.facebook.com/v8.0/${response.id}/picture/`,
          });
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.setState({ isError: error.response.data });
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            this.setState({ isError: error.request.data });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.setState({ isError: error.message.data });
          }
        });
    }
  };

  render() {
    return (
      <div className="mt-3">
        <FacebookLogin
          appId="939633486446911"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.login}
        />

        {this.state.isError.non_field_errors && (
          <p className="text-danger text-center">
            {this.state.isError.non_field_errors[0]}. Try signing in through
            that method
          </p>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authSuccess: (token) => dispatch(actions.authSuccess(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookBtn);
