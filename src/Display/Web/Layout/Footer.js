import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { ButtonGroup, Button, Icon } from "semantic-ui-react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Home";
import CasinoIcon from "@material-ui/icons/Casino";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
  console.log(props);
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
              href="https://www.facebook.com/Elitemanga-111366027365642/?modal=admin_todo_tour"
              color="facebook"
              icon="facebook"
            />
            <Button
              circular
              className="mb-1"
              size="large"
              href="https://twitter.com/elitemanga1"
              color="twitter"
              icon="twitter"
            />{" "}
            <Button
              circular
              href="https://discord.gg/fzy7yS7"
              className="md-1 discord"
              size="large"
              style={{ color: "white", backgroundColor: "#7289da" }}
              icon="discord"
            />{" "}
            <Button
              circular
              href="https://www.reddit.com/r/elitemanga/"
              className="md-1 reddit"
              size="large"
              style={{ color: "white", backgroundColor: "#ff4500" }}
              icon="reddit"
            />{" "}
          </div>
          <div className="footer-b">
            <div className="footer-c">Contact us</div>
            <div className="footer-c">FAQ</div>
            <div className="footer-c">
              Affliated Sites :{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://thewotguide.com"
              >
                TheWOTGuide
              </a>
            </div>
            <div className="footer-c"></div>
            <div className="footer-c last">Donate to us</div>
          </div>
        </div>

        <div className="text-center py-3">
          <Container className="footer-b" fluid>
            <Link to="/privacy-policy/" className="mr-1 footer-c lom">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy/" className="mr-1 footer-c lom">
              Cookie Policy
            </Link>
            <Link to="/terms-of-use/" className="mr-1 footer-c lom">
              Terms of Service
            </Link>
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
            icon={<CasinoIcon />}
          />
        </Link>

        {props.isAuthenticated ? (
          <BottomNavigationAction
            label="Logout"
            showLabel
            onClick={logout}
            icon={<ExitToAppIcon />}
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
              icon={<VpnKeyIcon />}
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
