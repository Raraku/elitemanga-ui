import React from "react";
import { GetMangasInfo } from "./../../../HOC/manga/Mangainfo";
import { Paper } from "@material-ui/core";
import { Row, Button, Col, Card } from "react-bootstrap";
import MangaIcon from "./../components/MangaCards/LastUpdatedManga";
import {
  Divider,
  Segment,
  Loader,
  Header,
  Icon,
  CardGroup,
} from "semantic-ui-react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import PlaceholderCard from "./../components/Placeholders/PlaceholderCard";

const Heroes = (props) => {
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("mixedinfo/get_heroes/").then((res) => {
      setManga(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <Card>
      <Card.Header>
        <Divider horizontal>
          <Header className="need-theme" as="h5">
            <Icon name="rss" />
            Hallmark of Heroes
          </Header>
        </Divider>
      </Card.Header>
      <Card.Body>
        <div>
          <CardGroup className="semiExclude" itemsPerRow={6}>
            {!loading
              ? manga.map((manga) => (
                  <MangaIcon
                    title={manga.title}
                    loading={props.loading}
                    rank={manga.rank}
                    author={manga.author}
                    alias={manga.alias}
                    last_updated={manga.last_updated}
                    type={0}
                    image_url={manga.image_url}
                    description={manga.description}
                    media_type={manga.media_type}
                  />
                ))
              : [...Array(18)].map((e, i) => <PlaceholderCard />)}
          </CardGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Heroes;
