import React from "react";
import axios from "axios";
import { CardDeck, Row } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import {
  Divider,
  Header,
  Segment,
  Loader,
  Icon,
  CardGroup,
} from "semantic-ui-react";
import NormalCard from "./NormalCard";
import { withRouter } from "react-router-dom";

class SimilarManga extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manga: [],
      loading: true,
    };
  }
  getManga = () => {
    axios.get(`/mixed/${this.props.id}/get_related_manga/`).then((res) => {
      this.setState({ manga: res.data, loading: false });
    });
  };
  componentDidMount() {
    if (this.props.id != undefined) {
      this.getManga();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.getManga();
    }
    if (prevProps.id !== this.props.id) {
      this.getManga();
    }
  }
  render() {
    console.log(this.props.id);
    return (
      <div>
        <Segment>
          <div>
            <Divider horizontal>
              <Header className="need-theme" as="h5">
                <Icon name="rss" />
                Related Media
              </Header>
            </Divider>
          </div>
          {!this.state.loading ? (
            <div>
              <Row className="flex-row wrapper mb-4 swrap flex-nowrap similar-wrap">
                <div>
                  <CardGroup className="excluded" itemsPerRow={6}>
                    {this.state.manga.slice(0, 6).map((manga) => (
                      <NormalCard
                        title={manga.title}
                        key={manga.id}
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
                </div>
              </Row>
            </div>
          ) : (
            <Segment>
              <div style={{ height: "200px" }}>
                <Loader active size="big"></Loader>
              </div>
            </Segment>
          )}
        </Segment>
      </div>
    );
  }
}
export default withRouter(SimilarManga);
