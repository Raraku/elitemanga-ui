import axios from "axios";
import * as actionTypes from "./actionTypes";
import axiosConfig from "./../../Display/HOC/axiosConfig";
import { lightTheme, darkTheme } from "./../../Display/Web/Layout/theme";

const applyTheme = (thisTheme) => {
  console.log(thisTheme);
  const theme = thisTheme === "light" ? lightTheme : darkTheme;
  Object.keys(theme).map((key) => {
    const value = theme[key];
    document.documentElement.style.setProperty(key, value);
    console.log("done");
  });
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const setMode = (mode) => {
  applyTheme(mode);
  localStorage.setItem("displayMode", mode);
  return {
    type: actionTypes.SET_MODE,
    mode,
  };
};

export const authSuccess = (token) => {
  axiosConfig.defaults.headers.common["Authorization"] =
    "Token " + localStorage.getItem("token");
  axiosConfig.interceptors.request.use(function (config) {
    config.headers.Authorization = "Token " + localStorage.getItem("token");
    return config;
  });
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const addManga = () => {
  return {
    type: actionTypes.ADD_MANGA,
  };
};

export const saveManga = (manga) => {
  return {
    type: actionTypes.GET_MANGA,
    manga: manga,
    mangaLoading: false,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const addNewManga = (manga_alias) => {
  return (dispatch) => {
    axiosConfig.get(`/manga/${manga_alias}/add_to_manga/`);
    dispatch(addManga());
  };
};
export const getManga = () => {
  return (dispatch) => {
    axiosConfig.get("/usermangastate/").then((res) => {
      dispatch(saveManga(res.data));
    });
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/rest-auth/login/", {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 100000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(authFail(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(authFail(error.request.data));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(authFail("Error", error.message.data));
        }
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        axiosConfig.get("/verify-email/");
        dispatch(checkAuthTimeout(3600));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(authFail(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(authFail(error.request.data));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(authFail("Error", error.message.data));
        }
        // dispatch(authFail(err);
      });
  };
};

export const checkMode = () => {
  return (dispatch) => {
    const mode = localStorage.getItem("displayMode");
    if (mode === null) {
      localStorage.setItem("displayMode", "light");
    } else {
      dispatch(setMode(mode));
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
