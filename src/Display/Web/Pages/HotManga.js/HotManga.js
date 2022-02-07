import React from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import MangaIcon from "./../components/MangaCards/LastReadIcon";
import { Loader, Segment, CardGroup } from "semantic-ui-react";

import { Helmet } from "react-helmet";

class HotManga extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manga: [],
      loading: true,
    };
  }
  componentDidMount() {
    axios.get("/mangainfo/").then((res) => {
      this.setState({ manga: res.data, loading: false });
    });
  }
  render() {
    return (
      <Paper className="recent-paper">
        <Helmet>
          <title>Hot Manga- EliteManga</title>
          <meta
            name="description"
            content="The most popular manga right now."
          />
        </Helmet>
        <div>
          <Row>
            <Col>
              <h3>Hot Manga</h3>
            </Col>
          </Row>
        </div>

        {!this.state.loading ? (
          <CardGroup itemsPerRow={7}>
            {this.state.manga.map((manga) => (
              <MangaIcon
                title={manga.title}
                loading={this.state.loading}
                author={manga.author}
                alias={manga.alias}
                rank={manga.rank}
                last_updated={manga.last_updated}
                image_url={manga.image_url}
                description={manga.description}
                media_type={manga.media_type}
              />
            ))}
          </CardGroup>
        ) : (
          <Segment>
            <div style={{ height: "200px" }}>
              <Loader active size="big"></Loader>
            </div>
          </Segment>
        )}
      </Paper>
    );
  }
}
export default HotManga;
