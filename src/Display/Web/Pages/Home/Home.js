//Manga api
//Recents
import React from "react";
import LatestAnime from "./LatestAnime";
import LatestManga from "./LatestManga";
import HotManga from "./HotManga";
import { Helmet } from "react-helmet";
import { Col, Card } from "react-bootstrap";
import Sidebar from "./Left";
import { Row } from "react-bootstrap";

import HotAnime from "./HotAnime";
import { Segment } from "semantic-ui-react";
import Unreleased from "./Unreleased";
import Hero from "./Hero";
import Lists from "./Lists";
import Heroes from "./Heroes";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
    };
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>
            EliteManga - Find and read the best Manga and Anime online
          </title>
          <meta
            name="description"
            content="Find the best manga and anime. Comprehensively reviewed, selected and ranked by a team of experts from
            the comfort of your devices"
          />
        </Helmet>

        <Row noGutters>
          <Col xs={12} md={9}>
            <Segment className="p-0 colorless">
              <HotManga />

              <HotAnime />
            </Segment>
          </Col>
          <Col xs={12} md={3}>
            <Segment className="p-0 colorless">
              <Lists />
            </Segment>
          </Col>
        </Row>

        <Hero />

        <Row noGutters>
          <Col
            className="pr-1"
            xs={{ order: 1, span: 12 }}
            md={{ order: 1, span: 9 }}
          >
            <Segment className="p-0">
              <LatestAnime type="1" />
              <LatestManga type="0" />
              <Heroes />
            </Segment>
          </Col>
          <Col
            className="pl-0"
            xs={{ order: 1, span: 12 }}
            md={{ order: 2, span: 3 }}
          >
            <Segment className="p-0">
              <Unreleased />
              {/*Top Manga of all Time*/}
              <Sidebar type="0" />
              {/*Top Anime of all Time*/}
              <Sidebar type="1" />
            </Segment>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Home;
