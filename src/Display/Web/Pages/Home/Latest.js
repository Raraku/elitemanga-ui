import React from "react";
import { GetMangasInfo } from "./../../../HOC/manga/Mangainfo";
import { Paper } from "@material-ui/core";
import { Row, Button } from "react-bootstrap";
import MangaIcon from "./../components/MangaCards/LastUpdatedManga";
import { Divider, Segment, Loader } from "semantic-ui-react";

const Latest = (props) => {
  return (
    <Paper className="recent-paper">
      <div>
        <Divider horizontal>
          <h3>Latest Updates</h3>
        </Divider>
      </div>

      {!props.loading ? (
        <div>
          <Row>
            {props.manga.slice(0, 6).map((manga) => (
              <MangaIcon
                title={manga.title}
                loading={props.loading}
                rank={manga.rank}
                author={manga.author}
                alias={manga.alias}
                last_updated={manga.last_chapter_date}
                image_url={manga.image_url}
              />
            ))}
          </Row>
          <div className="text-right">
            <Button variant="outline-success">See more</Button>
          </div>
        </div>
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

export default GetMangasInfo(Latest);
