import React from "react";
import axios from "axios";
import { Row, Col, Button, Card } from "react-bootstrap";
import MangaIcon from "./../components/MangaCards/LastReadIcon";
import PlaceholderCard from "./../components/Placeholders/PlaceholderCard";
import {
  Loader,
  Segment,
  Divider,
  Header,
  Icon,
  CardGroup,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class HotManga extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manga: [],
      loading: true,
    };
  }
  componentDidMount() {
    axios.get("/mangainfo/get_weekly_manga/").then((res) => {
      this.setState({ manga: res.data, loading: false });
    });
  }
  render() {
    return (
      <Card>
        <Card.Header className="landing">
          <Divider horizontal>
            <Header className="need-light-theme" as="h3">
              <Icon name="trophy" />
              Trending Manga this week
            </Header>
          </Divider>
        </Card.Header>
        <Card.Body className="landing-card">
          <div>
            <CardGroup itemsPerRow={6}>
              {!this.state.loading
                ? this.state.manga.map((manga) => (
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
                  ))
                : [0, 1, 2, 3, 4, 5].map((e, i) => <PlaceholderCard />)}
            </CardGroup>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
export default HotManga;
