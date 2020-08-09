import React, { useState } from "react";
import he from "he";
import { Placeholder, Image, Label, Card, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

function MangaIcon(props) {
  const [errored, setErrored] = useState(true);
  const [show, setShow] = useState(false);
  const color = {
    Kami: "green",
    S: "yellow",
    A: "teal",
    B: "brown",
  };

  return (
    <Card
      as={Link}
      to={
        props.media_type == 0
          ? `/manga/${props.alias}/`
          : `/anime/${props.alias}`
      }
      onClick={props.dismiss}
    >
      <Image
        fluid
        ui={false}
        label={{
          as: "a",
          color: color[props.rank],
          content: `${props.rank}`,
          ribbon: true,
        }}
        style={
          show ? {} : { width: "150px", height: "230px", visibility: "hidden" }
        }
        src={props.image_url}
        alt="manga-image"
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={(setErrored) => {
          setShow(false);
        }}
        onLoad={() => {
          setShow(true);
        }}
      />
      {!show && (
        <Placeholder style={{ height: "100%", width: "100%" }}>
          <Placeholder.Image rectangular />
        </Placeholder>
      )}
      <Card.Content>
        <Card.Header>
          {props.loading ? (
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          ) : (
            <div>{props.title}</div>
          )}
        </Card.Header>
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
          <Card.Meta className="text-muted one-line">{props.author}</Card.Meta>
        )}
      </Card.Content>
    </Card>
  );
}
export default MangaIcon;
