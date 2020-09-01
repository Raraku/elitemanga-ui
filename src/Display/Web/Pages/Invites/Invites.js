import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Row } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import axiosConfig from "./../../../HOC/axiosConfig";
import Alert from "@material-ui/lab/Alert";

const Invite = (props) => {
  const [invite, setInvite] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [error, onError] = useState("");
  const submitInvite = () => {
    console.log(invite.slice(window.location.href.length));
    console.log(window.location.href);
    axiosConfig
      .get(`/invites/${invite.slice(window.location.href.length)}`)
      .then((res) => {
        setSubmitted(res.data.user);
      })

      .catch((error) => {
        if (error.response) {
          onError(error.response.data.error);
          console.log(error.response.data.error);
        } else if (error.request) {
          onError(error.request.data.error);
        } else {
          // Something happened in setting up the request that triggered an Error
          onError(error.message.data.error);
        }
      });
  };
  useEffect(() => {
    if (props.isAuthenticated) {
      if (props.match.params.invite_link.length > 0) {
        setInvite(props.match.params.invite_link);
        axiosConfig
          .get(`/invites/${props.match.params.invite_link}/`)
          .then((res) => {
            setSubmitted(res.data.user);
          })

          .catch((error) => {
            if (error.response) {
              onError(error.response.data.error);
              console.log(error.response.data.error);
            } else if (error.request) {
              onError(error.request.data.error);
            } else {
              // Something happened in setting up the request that triggered an Error
              onError(error.message.data.error);
            }
          });
      }
    } else {
      setInvite(window.location.href);
    }
  }, [props.isAuthenticated]);
  console.log(props, invite);
  return (
    <div className="d-flex invite-first flex-column h-100 justify-content-center align-items-center">
      {!props.isAuthenticated ? (
        <Alert severity="danger">
          You are not logged in. Please log in to accept an Invite.
        </Alert>
      ) : (
        <Paper elevation={15} className="invite-second">
          <h3>Hi There</h3>
          {!submitted.length > 0 ? (
            <>
              <p className="text-muted">Got an invite Link? Paste it below</p>
              <form onSubmit={submitInvite}>
                <TextField
                  value={invite}
                  onChange={(event) => {
                    setInvite(event.target.value);
                  }}
                  variant="outlined"
                />
                <Button onClick={submitInvite}> show</Button>
                {error.length > 0 && (
                  <p className="text-danger ml-2">{error}</p>
                )}
              </form>
            </>
          ) : (
            <p>
              Congrats, your invitation from {submitted} has been confirmed.
              Welcome to Elitemanga.
            </p>
          )}
        </Paper>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};
export default connect(mapStateToProps)(Invite);
