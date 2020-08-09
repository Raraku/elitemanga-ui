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

const Latest = (props) => {
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("mangainfo/get_current_manga/").then((res) => {
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
            Top Manga in serialization
          </Header>
        </Divider>
      </Card.Header>
      <Card.Body>
        <div>
          <CardGroup itemsPerRow={6}>
            {!loading
              ? manga
                  .slice(0, 12)
                  .map((manga) => (
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
              : [0, 1, 2, 3, 4, 5].map((e, i) => <PlaceholderCard />)}
          </CardGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Latest;
