//Favorites api endpoints
//Create, delete, updated, Retrieve
import React from "react";
import { Paper } from "@material-ui/core";
import { Button } from "react-bootstrap";
import MangaIcon from "./../components/MangaCards/LastReadIcon";
import getFavorites from "./../../../HOC/manga/Favorites";
import { Segment, Loader, Header } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

class Favorites extends React.Component {
  render() {
    if (this.props.favorites > 0) {
      console.log(this.props.favorites);
      return (
        <div>
          <Helmet>
            <title>Favorites - EliteManga</title>
            <meta
              name="description"
              content="Your favorite Manga and anime, all in one place. Accessible from any device"
            />
          </Helmet>
          <Paper>
            <h3>Favorite Manga</h3>

            {this.props.loading === false ? (
              this.props.favorites.map((manga) => (
                <MangaIcon
                  loading={this.props.loading}
                  title={manga.manga.title}
                  author={manga.manga.author}
                  last_read={manga.last_read}
                  rank={manga.manga.rank}
                  image_url={manga.manga.image_url}
                  description={manga.manga.description}
                />
              ))
            ) : (
              <Segment>
                <div style={{ height: "200px" }}>
                  <Loader active size="big"></Loader>
                </div>
              </Segment>
            )}
            {this.props.favorites.length === 1 && (
              <div className="text-center">
                {" "}
                You have only one favorited manga. Check out these other manga:
              </div>
            )}
          </Paper>
        </div>
      );
    } else {
      return (
        <Paper>
          <Segment>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <Header>{this.props.err}</Header>
              <br />
              <Button as={Link} to="/login/">
                Login
              </Button>
            </div>
          </Segment>
        </Paper>
      );
    }
  }
}

export default getFavorites(Favorites);
