import React, { useState, useEffect } from "react";
import { Card, Col, Badge } from "react-bootstrap";
import ImageIcon from "@material-ui/icons/Image";
import he from "he";
import { Button, Divider, Image, Placeholder, Label } from "semantic-ui-react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

function MangaIcon(props) {
  const [errored, setErrored] = useState(true);
  const [show, setShow] = useState(true);
  const color = {
    Kami: "green",
    S: "yellow",
    A: "#2f273a",
    B: "brown",
  };

  console.log(props.media_type);
  console.log(show);
  return (
    <Col className="manga-card-single" xs={12} lg={props.col_size}>
      <Card className="special-card" id="detail-card">
        <div className="a-card-image">
          <div className="a2-card-image" style={{ height: "100%" }}>
            <Image
              fluid
              className="theaim"
              label={{
                as: "a",
                color: color[props.rank],
                content: `${props.rank}`,
                ribbon: true,
              }}
              style={
                show ? { width: "100%" } : { width: "100%", display: "none" }
              }
              src={props.image_url}
              alt="manga-image"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(setErrored) => {
                setShow(false);
              }}
              onLoad={() => {
                setErrored(false);
                setShow(true);
              }}
            />
            {errored && (
              <Placeholder style={{ height: "100%", width: "100%" }}>
                <Placeholder.Image rectangular />
              </Placeholder>
            )}
          </div>
        </div>
        <Card className="special-card" className="a-card-content">
          <Card.Body>
            <Card.Title>
              {props.loading ? (
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              ) : (
                <h3>{props.title}</h3>
              )}
            </Card.Title>
            {props.loading ? (
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            ) : (
              <div>
                <Card.Text>{he.decode(props.description)}</Card.Text>

                <Card.Subtitle className="text-muted">
                  {props.author}
                </Card.Subtitle>
              </div>
            )}
          </Card.Body>
        </Card>
        <Label attached="bottom right">
          {props.media_type == 0 ? "Manga" : "Anime"}
        </Label>
      </Card>
    </Col>
  );
}
export default MangaIcon;

MangaIcon.defaultProps = {
  col_size: 6,
  last_read: false,
};
