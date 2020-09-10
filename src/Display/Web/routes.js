import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "./utils/Loader";
import axiosConfig from "./../HOC/axiosConfig";
const Home = React.lazy(() => import("./Pages/Home/Home"));
const RandomManga = React.lazy(() => import("./Pages/RandomManga/RandomManga"));
const Login = React.lazy(() => import("./Pages/Login/Login"));
const SignUp = React.lazy(() => import("./Pages/Signup/SignUp"));
const ContactForm = React.lazy(() => import("./Pages/ContactForm/ContactForm"));
const MangaDetail = React.lazy(() => import("./Pages/MangaDetail/MangaDetail"));
const MangaList = React.lazy(() => import("./Pages/MangaList/MangaList"));
const PasswordReset = React.lazy(() =>
  import("./Pages/PasswordReset/PasswordReset")
);
const RecentManga = React.lazy(() => import("./Pages/Recents/Recents"));
const HotManga = React.lazy(() => import("./Pages/HotManga.js/HotManga"));
const UserReviews = React.lazy(() => import("./Pages/UserReview/UserReviews"));
const Display = React.lazy(() => import("./Pages/RandomManga/display"));
const Lists = React.lazy(() => import("./Pages/List/Lists"));
const ListDetail = React.lazy(() => import("./Pages/ListDetail/ListDetail"));
const Profile = React.lazy(() => import("./Pages/Profile/Profile"));
const Announcement = React.lazy(() =>
  import("./Pages/Announcements/AnnouncementDetail")
);
const Invite = React.lazy(() => import("./Pages/Invites/Invites"));

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
    <Suspense
      fallback={
        <span>
          <Loader />
        </span>
      }
    >
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
        <Route
          exact
          path="/anime/:manga/"
          render={(props) => <MangaDetail {...props} type={"1"} />}
        />
        <Route exact path="/manga/:manga/" component={MangaDetail} />
        <Route path="/manga/" component={MangaList} />
      </Switch>
    </Suspense>
  );
};

export default WebRouter;
