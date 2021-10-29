//MangaInfo
import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import MangaIcon from "./../components/MangaCards/LastReadIcon";
import { Row } from "react-bootstrap";
import {
  Divider,
  SearchCategory,
  Segment,
  Loader,
  Header,
  Icon,
} from "semantic-ui-react";
import axios from "axios";
import { CardGroup } from "semantic-ui-react";

const MangaSearch = (props) => {
  const [manga, setManga] = useState(null);
  const [correctManga, setCorrectManga] = useState([]);
  useEffect(() => {
    axios
      .get("/mixed/search/", {
        params: {
          search: props.params,
        },
      })
      .then((res) => {
        setManga(res.data);
      });
  }, []);

  const dismissModal = () => {
    props.selected();
  };
  console.log(props);
  return (
    <Paper className="recent-paper">
      <Divider horizontal>
        <Header className="need-theme" as="h3">
          <Icon name="trophy" />
          Search Results
        </Header>
      </Divider>
      {manga == null ? (
        <Segment>
          <div style={{ height: "200px" }}>
            <Loader active size="big"></Loader>
          </div>
        </Segment>
      ) : (
        <div>
          {manga.length > 0 ? (
            <CardGroup className="p-3" itemsPerRow={8}>
              {manga.map((manga) => (
                <MangaIcon
                  col_size={6}
                  dismiss={dismissModal}
                  loading={props.loading}
                  title={manga.title}
                  author={manga.author}
                  rank={manga.rank}
                  media_type={manga.media_type}
                  alias={manga.alias}
                  image_url={manga.image_url}
                  description={manga.description}
                />
              ))}
            </CardGroup>
          ) : (
            <h3>
              Sorry, no manga found for your search parameter "{props.params}"
            </h3>
          )}
        </div>
      )}
    </Paper>
  );
};

export default MangaSearch;
