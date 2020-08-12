import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { ButtonGroup, Button } from "semantic-ui-react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles } from "@material-ui/core/styles";
import * as actions from "./../../../store/actions/auth";
import { connect } from "react-redux";
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});
const FooterPage = (props) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const logout = () => {
    props.logout();
    props.history.push("/login/");
  };
  return (
    <div className="nav-main">
      <Navbar
        sticky="bottom"
        className="footer-nav vanish blee text-white pt-4 p-1"
      >
        <div className="footer-a">
          <div className="footer-d">
            <Button
              circular
              className="mb-1"
              size="large"
              color="facebook"
              icon="facebook"
            />
            <Button
              circular
              className="mb-1"
              size="large"
              color="twitter"
              icon="twitter"
            />{" "}
            <Button
              circular
              className="md-1"
              size="large"
              icon="discord"
              color="discord"
            />{" "}
            <Button
              circular
              className="md-1"
              size="large"
              color="reddit"
              icon="reddit"
            />{" "}
          </div>
          <div className="footer-b">
            <div className="footer-c">Contact us</div>
            <div className="footer-c">How our Reviews work</div>
            <div className="footer-c">Privacy Policy</div>
            <div className="footer-c">Terms of service</div>
            <div className="footer-c last">Donate to us</div>
          </div>
        </div>

        <div className="text-center py-3">
          <Container className="footer-b" fluid>
            <div className="mr-1 footer-c lom">Privacy Policy</div>
            <div className="mr-1 footer-c lom">Terms of Service</div>
            <div className="footer-c last">
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a id="foot" href="https://www.elitemanga.net">
                {" "}
                Elitemanga.net{" "}
              </a>
            </div>
          </Container>
        </div>
      </Navbar>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root + " mobile"}
      >
        <Link
          className="MuiButtonBase-root MuiBottomNavigationAction-root "
          to="/"
        >
          <BottomNavigationAction
            label="Home"
            showLabel
            selected={props.location.pathname === "/"}
            icon={<RestoreIcon />}
          />
        </Link>
        <Link
          className="MuiButtonBase-root MuiBottomNavigationAction-root"
          to="/manga/"
        >
          <BottomNavigationAction
            label="All Manga"
            showLabel
            selected
            selected={props.location.pathname === "/manga/"}
            icon={<RestoreIcon />}
          />
        </Link>

        <Link
          className="MuiButtonBase-root MuiBottomNavigationAction-root"
          to="/random/"
        >
          {" "}
          <BottomNavigationAction
            label="Random Manga"
            selected={props.location.pathname === "/random/"}
            showLabel
            icon={<FavoriteIcon />}
          />
        </Link>

        {props.isAuthenticated ? (
          <BottomNavigationAction
            label="Logout"
            showLabel
            onClick={logout}
            icon={<LocationOnIcon />}
          />
        ) : (
          <Link
            className="MuiButtonBase-root MuiBottomNavigationAction-root"
            to="/login/"
          >
            <BottomNavigationAction
              label="Login/Signup"
              showLabel
              selected={props.location.pathname === "/login/"}
              icon={<LocationOnIcon />}
            />
          </Link>
        )}
      </BottomNavigation>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FooterPage));
