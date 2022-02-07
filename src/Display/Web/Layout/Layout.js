import React from "react";
import {
  Container,
  Navbar,
  Row,
  Col,
  Form,
  Nav,
  Button,
  InputGroup,
} from "react-bootstrap";
import AppBar from "@material-ui/core/AppBar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MaterialButton from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter, Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import MangaSearch from "./../Pages/Search/Search";
import { Divider, Input, Segment, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "./../../../store/actions/auth";
import TextField from "@material-ui/core/TextField";
import logo from "./../../../LogoWhite.png";
import logo2 from "./../../../LogoBlack.png";
import FooterPage from "./Footer";
import Avatar from "@material-ui/core/Avatar";
import axiosConfig from "./../../HOC/axiosConfig";
import { lightTheme, darkTheme } from "./theme";
import DropdownBootstrap from "react-bootstrap/Dropdown";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MaterialDivider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import work from "./tenor.gif";
import Alert from "@material-ui/lab/Alert";
import CookieConsent, { Cookies } from "react-cookie-consent";
import GoogleAds from "../../HOC/GoogleAds";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      search: false,
      value: "",
      open: false,
      showInput: false,
      profile: null,
      dropValue: 0,
      new: 0,
      announcements: [],
      currentTheme: "light",
      options: [
        {
          key: "user",
          text: (
            <span>
              Signed in as <strong>Bob Smith</strong>
            </span>
          ),
          disabled: true,
        },
        { key: "profile", text: "Profile", icon: "user", value: 1 },
        {
          key: "settings",
          text: "Light/Dark Mode",
          icon: "sun",
          value: 2,
        },
        { key: "sign-out", text: "Sign Out", icon: "sign out", value: 3 },
      ],
    };
  }
  componentDidMount() {
    axiosConfig.get("/announcement/get_recent_announcements/").then((res) => {
      this.setState({ announcements: res.data });
      this.lastLogin();
    });
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleDialogOpen = () => {
    this.setState({ open: true });
  };
  setDark = () => {
    const nextTheme = this.props.mode === "light" ? "dark" : "light";
    this.props.setMode(nextTheme);
  };
  lastLogin = () => {
    if (localStorage.getItem("elitemanga_last_seen") !== null) {
      const last_login = localStorage.getItem("elitemanga_last_seen");
      const new_login = new Date().getTime();
      this.setState(() => {
        var new_ann = this.state.announcements.filter((ann) => {
          console.log(new Date(ann.date_written));
          console.log(new Date(parseInt(last_login)));
          console.log(
            new Date(ann.date_written) > new Date(parseInt(last_login))
          );
          return new Date(ann.date_written) > new Date(parseInt(last_login));
        });
        console.log(new_ann);
        return {
          new: new_ann.length,
        };
      });

      localStorage.setItem("elitemanga_last_seen", new_login);
    } else {
      const new_login = new Date().getTime();
      localStorage.setItem("elitemanga_last_seen", new_login);
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({ reload: !this.state.reload });
      console.log("changed");
      this.setState({ search: false });
      this.forceUpdate();
      window.scrollTo(0, 0);
    }
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      axiosConfig.get("/profile/").then((res) => {
        var options = this.state.options;

        options[0].text = (
          <span>
            Signed in as <strong>{res.data.username}</strong>
          </span>
        );
        this.setState({ options, profile: res.data });
      });
    }
    if (prevState.currentTheme !== this.state.currentTheme) {
      var options = this.state.options;

      options[2].icon = this.state.currentTheme === "light" ? "moon" : "sun";
      this.setState({ options });
    }
  }

  changeSearchStatus = () => {
    this.setState({ search: !this.state.search });
  };
  dropChange = (e, { name, value }) => {
    switch (value) {
      case 1:
        this.props.history.push("/profile/");
        break;
      case 2:
        this.setDark();
        break;
      case 3:
        this.logout();
      default:
        break;
    }
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ search: true });
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
    if (event.target.value === "" && this.state.search === true) {
      this.changeSearchStatus();
    }
  };
  logout = () => {
    this.props.logout();
    this.props.history.push("/login/");
  };
  setShowInput = () => {
    this.setState({ showInput: !this.state.showInput, value: "" });
  };

  render() {
    console.log(this.props);

    return (
      <div>
        {localStorage.getItem("consent") === null && (
          <CookieConsent
            location="bottom"
            buttonText="I understand"
            cookieName="consent"
            cookieValue="true"
            onAccept={() => {
              localStorage.setItem("consent", true);
            }}
            acceptOnScroll="true"
            expires={365}
          >
            This website uses cookies to enhance the user experience.
          </CookieConsent>
        )}
        <Container>
          <Navbar
            variant="light"
            expand="md"
            style={{ color: "white" }}
            className="mynav vanish navbar-top-first"
          >
            <Navbar.Brand
              style={{ paddingTop: "0", paddingBottom: "0" }}
              as={Link}
              to="/"
            >
              <img
                style={{ width: "2em", height: "2em" }}
                src={logo}
                alt="eliteManga"
              />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <Nav.Link as={Link} to="/manga/">
                  All Manga
                </Nav.Link>
                <Nav.Link as={Link} to="/random/">
                  Random Manga
                </Nav.Link>
                <Nav.Link as={Link} to="/random-anime/">
                  Recommend Anime
                </Nav.Link>
              </Nav>
              {/* <InputGroup>
                <Form.Control
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <InputGroup.Append>
                  <Button variant="outline-primary">Search</Button>
                </InputGroup.Append>
              </InputGroup> */}
              <form onSubmit={this.handleSubmit}>
                <Input
                  fluid
                  value={this.state.value}
                  onChange={this.handleChange}
                  icon="search"
                  placeholder="Search..."
                />
              </form>
              <div style={{ marginLeft: "auto", marginRight: "0" }}>
                {this.props.isAuthenticated ? (
                  <Nav>
                    {/* <Nav.Link onClick={this.logout}>
                      <span>Logout</span>
                    </Nav.Link> */}
                    <Tooltip title="Notifications">
                      <DropdownBootstrap as={IconButton} direction="left">
                        <DropdownBootstrap.Toggle
                          className="drop-neon"
                          color="white"
                          as={Badge}
                          badgeContent={this.state.new}
                          color="secondary"
                        >
                          <NotificationsIcon style={{ color: "white" }} />
                        </DropdownBootstrap.Toggle>
                        <DropdownBootstrap.Menu
                          as={List}
                          className="notif-menu"
                        >
                          {this.state.announcements.map((news) => (
                            <DropdownBootstrap.Item
                              className="notif-item"
                              to={`/announcements/${news.slug}/`}
                              as={Link}
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <ViewHeadlineIcon className="icon-special" />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={`${news.title}`}
                                  secondary={`${news.date_written}`}
                                />
                              </ListItem>
                              <MaterialDivider variant="inset" component="li" />
                            </DropdownBootstrap.Item>
                          ))}
                        </DropdownBootstrap.Menu>
                      </DropdownBootstrap>
                    </Tooltip>
                    <Tooltip title="Open Menu">
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <Dropdown
                          trigger={
                            <Avatar
                              className="navatar"
                              src={
                                this.state.profile !== null
                                  ? this.state.profile.avatar_thumbnail
                                  : ""
                              }
                            />
                          }
                          options={this.state.options}
                          pointing="top left"
                          value={this.state.dropValue}
                          icon={null}
                          onChange={this.dropChange}
                        />
                      </IconButton>
                    </Tooltip>
                  </Nav>
                ) : (
                  <Nav>
                    <Nav.Link as={Link} to="/login/">
                      <span>Login</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup/">
                      <span>Signup</span>
                    </Nav.Link>
                  </Nav>
                )}
              </div>
            </Navbar.Collapse>
          </Navbar>
        </Container>
        <Dialog
          TransitionComponent={Transition}
          className="pre-open-dialog"
          open={false}
          class="prompt"
        >
          <DialogTitle>
            Hi There, Elitemanga is still under development
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className="progress-image-div">
                <img className="img-work" alt="progress" src={work} />
              </div>
              <p>
                Don't be sad though. Just install this app and we will notify
                you when we launch. There are three ways to install our site:
              </p>
              <Row>
                <Col className="we-are-sorry" xs={4}>
                  On Mobile: <AddToHomeScreenIcon />
                </Col>
                <Col className="we-are-sorry" xs={4}>
                  On Desktop: <AddCircleOutlineIcon />
                </Col>
                <Col className="we-are-sorry" xs={4}>
                  On IOS <SystemUpdateAltIcon />
                </Col>
              </Row>
              Depending on your platform, one of these icons above should be in
              your url bar. Alternatively, you can install it by "Adding to Home
              Screen".
              <div className="text-right mt-2">
                ~Dōmo arigatōgozaimashita. See you soon
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <div className="mobile">
          <AppBar position="static">
            <Toolbar>
              <Link to="">
                <Typography className="appbar-title" variant="h5">
                  <img
                    style={{ width: "1.5em", height: "1.5em" }}
                    src={logo2}
                    alt="eliteManga"
                  />
                </Typography>
              </Link>
              {this.state.showInput && (
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    fullWidth
                    autoFocus
                    onBlur={this.setShowInput}
                    value={this.state.value}
                    onChange={this.handleChange}
                    id="standard-basic"
                  />
                </form>
              )}
              <span className={this.props.isAuthenticated ? "ask" : "ask-b"}>
                {!this.state.showInput && (
                  <Tooltip title="Search">
                    <IconButton
                      onClick={this.setShowInput}
                      aria-label="search"
                      color="inherit"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Notifications">
                  <IconButton onClick={this.handleDialogOpen}>
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
                {this.props.isAuthenticated && (
                  <Tooltip title="Open Menu">
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <Dropdown
                        trigger={
                          <Avatar
                            className="navatar"
                            src={
                              this.state.profile !== null
                                ? this.state.profile.avatar_thumbnail ||
                                  this.state.profile.social_avatar
                                : ""
                            }
                          />
                        }
                        options={this.state.options}
                        pointing="top right"
                        value={this.state.dropValue}
                        icon={null}
                        onChange={this.dropChange}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </span>
            </Toolbar>
          </AppBar>
        </div>
        <Row className="torine">
          <Col
            className="vanish  text-center"
            style={{ marginRight: "auto", marginLeft: "auto" }}
            xs={0}
            md={1}
          >
            <GoogleAds slot="6622607966" />
          </Col>
          <Col className="torino" xs={12} md={9}>
            <Container id="cont-1">
              {/* <Col className="coll-hidden" xs={1}>
            <Sidebar />
          </Col> */}

              <Container id="my-cont">
                <Dialog
                  fullScreen
                  className="mobile"
                  open={this.state.open}
                  TransitionComponent={Transition}
                >
                  <List>
                    {this.state.announcements.map((news) => (
                      <Link
                        to={`/announcements/${news.slug}/`}
                        onClick={this.handleClose}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <ViewHeadlineIcon className="icon-special" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${news.title}`}
                            secondary={`${new Date(
                              news.date_written
                            ).toDateString()}`}
                          />
                        </ListItem>
                        <MaterialDivider variant="inset" component="li" />
                      </Link>
                    ))}
                  </List>
                  <div className="dialog-flex">
                    <Tooltip title="Close">
                      <IconButton onClick={this.handleClose}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Dialog>
                <Segment className="mt-2">
                  {this.state.profile !== null && (
                    <div>
                      {this.state.profile.verified === false && (
                        <Alert severity="warning">
                          Please verify your email address
                        </Alert>
                      )}
                    </div>
                  )}
                  {this.state.search ? (
                    <MangaSearch
                      selected={this.changeSearchStatus}
                      params={this.state.value}
                    />
                  ) : (
                    this.props.children
                  )}
                  <FooterPage />
                </Segment>
              </Container>
            </Container>
          </Col>
          <Col className="vanish text-center" style={{ marginRight: "auto", marginLeft: "auto" }}xs={0} md={1}>
            <GoogleAds slot="6622607966" />
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
    mode: state.auth.mode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
    setMode: (mode) => dispatch(actions.setMode(mode)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
