import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Display from "./display";
import { Redirect } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { Form, Segment, Loader } from "semantic-ui-react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MobileStoreButton from "react-mobile-store-button";

const RandomManga = (props) => {
  const [status, setStatus] = useState(0);
  const remakeUUrl =
    "https://play.google.com/store/apps/details?id=com.eria.remakeU&hl=en&gl=US";
  const [chosenManga, setChosenManga] = useState(null);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("0");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  var div1 = React.useRef();
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src =
      "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=8c992433-ae2e-4012-aca6-9a3de15989eb";
    div1.appendChild(script1);
  }, []);
  console.log(value);
  const chooseManga = (data) => {
    // const qualifiedManga = manga.filter((item) => {
    //   for (let i = 0; i < props.manga.length; i++) {
    //     if (props.manga[i].alias == item.alias) {
    //       return true;
    //     }
    //   }
    // });
    var many = data[Math.floor(Math.random() * data.length)];
    setChosenManga(many);
    setStatus(2);
    console.log(many);
  };
  console.log(chosenManga);
  const getManga = () => {
    setStatus(1);
    if (value === "0") {
      axios
        .get("/mixed/get_random_10/")
        .then((res) => {
          console.log(res.data);
          chooseManga(res.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
    if (value === "1") {
      axios
        .get("/manga/get_random_10/")
        .then((res) => {
          console.log(res.data);
          chooseManga(res.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
    if (value === "2") {
      axios
        .get("/anime/get_random_10/")
        .then((res) => {
          console.log(res.data);
          chooseManga(res.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };
  console.log(status);
  return (
    <div>
      <Helmet>
        <title>Random Anime Recommendation - EliteManga</title>
        <meta
          name="description"
          content="Don't know what to read next? Click the button and our systems will
          recommend a random anime for you for you. Don't like it? Click the button
          again!"
        />
      </Helmet>
      {status === 2 && (
        <div>
          {chosenManga.media_type == "0" ? (
            <Redirect
              to={{
                pathname: `/random-manga/${chosenManga.alias}/`,
              }}
            />
          ) : (
            <Redirect
              to={{
                pathname: `/random-anime/${chosenManga.alias}/`,
              }}
            />
          )}
        </div>
      )}
      {status === 1 && (
        <Segment>
          <div style={{ height: "200px" }}>
            <Loader active size="big"></Loader>
          </div>
        </Segment>
      )}
      <Row id="great-row">
        <Col xs={12} md={6} id="s-col">
          <div className="left-rand pt-3 text-white text-center">
            <h5>Random Manga/Anime generator</h5>
            <i>
              This produces a random Manga/Anime from our catalogue. Read the
              synopsis and our review to decide if it interests you, otherwise
              get another recommendation. Unfortunately, no filters can be
              applied because then, it wouldn't be random :)
            </i>
          </div>
        </Col>
        <Col className="right-rand " md={6} xs={12}>
          <div className="pt-3 rand-div-1">
            <FormControl className="different" component="fieldset">
              <FormLabel component="legend" className="different">
                Filter
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                row
                onChange={handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="Mixed" />
                <FormControlLabel value="1" control={<Radio />} label="Manga" />
                <FormControlLabel value="2" control={<Radio />} label="Anime" />
              </RadioGroup>
            </FormControl>

            <Button className="text-center rand-bt mu-3" onClick={getManga}>
              <h3>Get Recommendation</h3>
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1em",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <p>
                Develop better habits. Download the RemakeU app from the Google
                Play Store
              </p>
              <a href="https://play.google.com/store/apps/details?id=com.eria.remakeU&hl=en&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                <img
                  style={{ height: "6em" }}
                  alt="Get it on Google Play"
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                />
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <div
        ref={(el) => (div1 = el)}
        id="amzn-assoc-ad-8c992433-ae2e-4012-aca6-9a3de15989eb"
      ></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    manga: state.auth.manga,
  };
};
export default connect(mapStateToProps)(RandomManga);
