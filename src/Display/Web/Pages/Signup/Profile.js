import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Logo from "./../Profile/UploadIcon.1cedb6e9.svg";
import axiosConfig from "../../../HOC/axiosConfig";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

const Profile = (props) => {
  const [displayPicture, setPicture] = useState("");
  const [ServerPicture, setServerPicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);

  const handleCloseSnack = () => {
    setSuccess(false);
  };
  const handleClose = () => {
    props.history.push("/");
  };
  const onDrop = (event) => {
    var form_data = new FormData();
    form_data.append(
      "avatar",
      event.target.files[0],
      event.target.files[0].name
    );
    form_data.append("username", username);
    setPicture(URL.createObjectURL(event.target.files[0]));
    setServerPicture(event.target.files[0]);
    axiosConfig
      .put("/profile/", form_data, {
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
        if (res.data.avatar !== null) {
          setPicture(res.data.avatar);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center">Upload a profile picture</h2>
      <div className="fileUploader">
        <div className="fileContainer">
          <img src={Logo} className="uploadIcon" alt="Upload Icon" />
          <p className="">Max file size: 5mb, accepted: jpg|gif|png</p>
          <div className="errorsContainer"></div>
          <label for="upload-photo" className="chooseFileButton ">
            Choose image
          </label>
          <input
            onChange={onDrop}
            id="upload-photo"
            type="file"
            name=""
            accept="image/*"
          />
        </div>

        <div className="image-div">
          <Avatar
            alt="user avatar"
            src={displayPicture}
            className="avatar-user"
          />
          <p>{username}</p>
        </div>
      </div>
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
      <div className="text-center">
        <Button variant="contained" color="primary" onClick={handleClose}>
          Skip for now
        </Button>
        <Alert severity="warning">
          We have sent you a verification email. Please verify as soon as
          possible
        </Alert>
      </div>
    </div>
  );
};

export default Profile;
