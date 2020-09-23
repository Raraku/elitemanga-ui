import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";
import he from "he";
import { Placeholder, Image, Label, Item, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function NormalCard(props) {
  const [errored, setErrored] = useState(true);
  const [show, setShow] = useState(true);
  const color = {
    Kami: "green",
    S: "yellow",
    A: "#2f273a",
    B: "brown",
  };
  return (
    <Item
      as={Link}
      className="mobile-item"
      to={
        props.media_type == 0
          ? `/manga/${props.alias}/`
          : `/anime/${props.alias}`
      }
    >
      <Item.Image
        size="medium"
        as={Image}
        style={
          show
            ? { width: "20%" }
            : { height: "100px", width: "20%", display: "none" }
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
        }}
      />
      {errored && (
        <Placeholder style={{ height: "80px", width: "20%" }}>
          <Placeholder.Image rectangular />
        </Placeholder>
      )}
      <Item.Content>
        <Card.Title>
          {props.loading ? (
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          ) : (
            <div style={{ overflow: "hidden" }}>{props.title}</div>
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
            <Card.Subtitle className="text-muted one-line">
              {props.author}
            </Card.Subtitle>
          </div>
        )}
      </Item.Content>
    </Item>
  );
}
export default NormalCard;
