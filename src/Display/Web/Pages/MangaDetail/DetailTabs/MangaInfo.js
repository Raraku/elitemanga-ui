import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const MangaInfo = (props) => {
  const data = props.data;
  const { adaptation } = props.data;
  console.log(data);
  return (
    <Table unstackable definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Title</Table.Cell>
          <Table.Cell>{data.title}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Author</Table.Cell>
          <Table.Cell>{data.author}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Other Names</Table.Cell>
          <Table.Cell>{data.other_names}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Tags</Table.Cell>
          <Table.Cell>{data.tags && data.tags.join(", ")}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Views</Table.Cell>
          <Table.Cell>{data.hits}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Status</Table.Cell>
          <Table.Cell>{data.status == 1 ? "Ongoing" : "Finished"}</Table.Cell>
        </Table.Row>
        {data.adaptation && (
          <Table.Row>
            <Table.Cell>
              {data.media_type === "0" ? "Anime Adaptation" : "Source Manga"}
            </Table.Cell>
            <Table.Cell>
              <Link
                to={`/${data.media_type === "0" ? "anime" : "manga"}/${
                  data.adaptation.alias
                }`}
              >
                {data.adaptation.title}{" "}
                {data.media_type === "0" ? "(Anime)" : "(Manga)"}
              </Link>
            </Table.Cell>
          </Table.Row>
        )}
        {data.media && (
          <Table.Row>
            <Table.Cell>
              {data.media_type === "0" ? "Anime Adaptation" : "Source Manga"}
            </Table.Cell>
            <Table.Cell>
              <Link
                to={`/${data.media_type === "0" ? "anime" : "manga"}/${
                  data.media.alias
                }`}
              >
                {data.media.title}{" "}
                {data.media_type === "0" ? "(Anime)" : "(Manga)"}
              </Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
export default withRouter(MangaInfo);
