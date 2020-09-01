import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Logo from "./UploadIcon.1cedb6e9.svg";
import axiosConfig from "../../../HOC/axiosConfig";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import UserReview from "./../UserReview/UserReviews";
import { Row, Col } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "antd";
import EditIcon from "@material-ui/icons/Edit";
import Stats from "./Stats";
import TextField from "@material-ui/core/TextField";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const { Title } = Typography;

const Profile = (props) => {
  const [displayPicture, setPicture] = useState("");
  const [ServerPicture, setServerPicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState("");
  const [isInput, setIsInput] = useState(false);
  const [username, setUsername] = useState("");
  const [uploadPicture, shouldUpload] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCloseSnack = () => {
    setSuccess(false);
  };
  //wrong. It actually just lets me upload
  const handleClose = () => {
    shouldUpload(!uploadPicture);
  };

  const onDrop = (event) => {
    setIsInput(false);
    var form_data = new FormData();
    if (event.target.files !== null) {
      form_data.append(
        "avatar",

        event.target.files[0],
        event.target.files[0].name
      );

      setPicture(URL.createObjectURL(event.target.files[0]));
      setServerPicture(event.target.files[0]);
    }
    form_data.append("username", username);
    axiosConfig
      .patch("/profile-upload/", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSuccess(true);
        setTimeout(function () {
          handleClose();
        }, 3000);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request.data);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message.data);
        }
      });
  };

  useEffect(() => {
    console.log();
    axiosConfig
      .get("/profile/")
      .then((res) => {
        setUsername(res.data.username);
        setSlug(res.data.slug);
        if (res.data.avatar !== null) {
          setPicture(res.data.avatar);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const changeType = (str) => {
    setIsInput(true);
  };
  const onChange = (event) => {
    setUsername(event.target.value);
  };
  return (
    <Row className="mr-0">
      <Col className="pt-0 pr-0" xs={12} md={3}>
        <Paper className="pb-3 mb-3">
          <h1 className="profile-title">
            {!isInput ? (
              <>
                {username}'s Profile
                <IconButton onClick={changeType}>
                  <EditIcon fontSize="large" />
                </IconButton>
              </>
            ) : (
              <TextField onChange={onChange} onBlur={onDrop} value={username} />
            )}
          </h1>
          <div className="image-div">
            <div className="my-user-avatar">
              <Avatar
                alt="user avatar"
                src={displayPicture}
                className="avatar-user"
              />
              <label for="upload-photo" className="chooseFileButton ">
                <AddAPhotoIcon />
              </label>
              <input
                onChange={onDrop}
                id="upload-photo"
                type="file"
                name=""
                accept="image/*"
              />
            </div>
            <p className="change">{username}</p>
            <TextField
              id="outlined-basic"
              label="Your Personal Invite Link"
              value={`${window.location.href.slice(0, -9)}/invites/${slug}/`}
              variant="outlined"
            />
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={success}
              autoHideDuration={4000}
              onClose={handleCloseSnack}
              message="Note archived"
            >
              <Alert onClose={handleClose} severity="success">
                Your picture has been uploaded
              </Alert>
            </Snackbar>
          </div>
          <Stats />
        </Paper>
      </Col>
      <Col as={Paper} className="pt-0 pr-0" xs={12} md={9}>
        <div className="mt-4">
          <UserReview />
        </div>
      </Col>
    </Row>
  );
};

export default Profile;
