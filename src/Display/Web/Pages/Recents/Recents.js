//Recents
//UserManga order-by Last Modified
import React from "react";
import { Col, Row } from "react-bootstrap";
import { GetUserMangas } from "./../../../HOC/usermanga/UserManga";
import MangaIcon from "../components/MangaCards/LastReadIcon";
import { Paper } from "@material-ui/core";

import { Loader, Segment } from "semantic-ui-react";
import { Helmet } from "react-helmet";

const Recents = (props) => {
  console.log(props.loading);
  return (
    <Paper className="recent-paper">
      <Helmet>
        <title>Recently Read - EliteManga</title>
        <meta
          name="description"
          content="Your recently read manga, accessible from any device"
        />
      </Helmet>
      <Row>
        <Col>
          <h3>Recently Read...</h3>
        </Col>
      </Row>
      {!props.loading ? (
        <Row className="">
          {props.manga.map((manga) => (
            <MangaIcon
              loading={props.loading}
              title={manga.manga.title}
              author={manga.manga.author}
              last_read={manga.last_read}
              rank={manga.manga.rank}
              image_url={manga.manga.image_url}
              description={manga.manga.description}
            />
          ))}
        </Row>
      ) : (
        <Segment>
          <div style={{ height: "200px" }}>
            <Loader active size="big"></Loader>
          </div>
        </Segment>
      )}
    </Paper>
  );
};
export default GetUserMangas(Recents);
