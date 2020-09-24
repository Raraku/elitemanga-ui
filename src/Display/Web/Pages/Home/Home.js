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
  componentDidMount = () => {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src =
      "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=8c992433-ae2e-4012-aca6-9a3de15989eb";
    this.div1.appendChild(script1);
    const script = document.createElement("script");
    script.src =
      "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=992750b0-5372-494d-b53a-6014b5497e41";
    this.div.insertAdjacentElement("afterend", script);
  };
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
              <div className="d-flex am-ad justify-content-center ml-auto">
                <div
                  ref={(el) => (this.div = el)}
                  id="amzn-assoc-ad-992750b0-5372-494d-b53a-6014b5497e41"
                ></div>
              </div>
              <Heroes />
              <div
                ref={(el) => (this.div1 = el)}
                id="amzn-assoc-ad-8c992433-ae2e-4012-aca6-9a3de15989eb"
              ></div>
              <script
                async
                src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=8c992433-ae2e-4012-aca6-9a3de15989eb"
              ></script>
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
