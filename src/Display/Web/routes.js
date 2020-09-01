import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import RandomManga from "./Pages/RandomManga/RandomManga";
import Test from "./Test";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/SignStepper";
import ContactForm from "./Pages/ContactForm/ContactForm";
import MangaDetail from "./Pages/MangaDetail/MangaDetail";
import MangaList from "./Pages/MangaList/MangaList";
import PasswordReset from "./Pages/PasswordReset/PasswordReset";
import RecentManga from "./Pages/Recents/Recents";
import HotManga from "./Pages/HotManga.js/HotManga";
import UserReviews from "./Pages/UserReview/UserReviews";
import Display from "./Pages/RandomManga/display";
import Lists from "./Pages/List/Lists";
import ListDetail from "./Pages/ListDetail/ListDetail";
import Profile from "./Pages/Profile/Profile";
import axiosConfig from "./../HOC/axiosConfig";
import Announcement from "./Pages/Announcements/AnnouncementDetail";
import GoogleBtn from "./Pages/Oauth/google";
import FacebookBtn from "./Pages/Oauth/facebook";
import Invite from "./Pages/Invites/Invites";

const WebRouter = () => {
  (function () {
    var token = localStorage.getItem("token");
    if (token) {
      axiosConfig.defaults.headers.common["Authorization"] =
        "Token " + localStorage.getItem("token");
    } else {
      axiosConfig.defaults.headers.common["Authorization"] = null;
      /*if setting null does not remove `Authorization` header then try     
           delete axios.defaults.headers.common['Authorization'];
         */
    }
  })();
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/random/" component={RandomManga} />
      <Route
        exact
        path="/random-anime/:manga/"
        render={(props) => <Display {...props} type={"1"} />}
      />
      <Route path="/random-manga/:manga/" component={Display} />
      <Route path="/contact-us/" component={ContactForm} />
      <Route path="/lists/:listSlug/" component={ListDetail} />
      <Route path="/lists/" component={Lists} />
      <Route path="/test/:searchParams" component={Test} />
      <Route path="/login/" component={Login} />
      <Route path="/announcements/:announcement/" component={Announcement} />
      <Route path="/password-reset/" component={PasswordReset} />
      <Route path="/recently-read/" component={RecentManga} />
      <Route path="/profile/" component={Profile} />
      <Route path="/signup/" component={SignUp} />
      <Route exact path="/invites/" component={Invite} />
      <Route path="/invites/:invite_link/" component={Invite} />
      <Route path="/hot-manga/" component={HotManga} />
      <Route path="/user-reviews/" component={UserReviews} />
      <Route path="/gb/" component={FacebookBtn} />
      <Route
        exact
        path="/anime/:manga/"
        render={(props) => <MangaDetail {...props} type={"1"} />}
      />
      <Route exact path="/manga/:manga/" component={MangaDetail} />
      <Route path="/manga/" component={MangaList} />
    </Switch>
  );
};

export default WebRouter;
