import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "semantic-ui-react";
import { Container } from "react-bootstrap";

export default function Announcement(props) {
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    axios
      .get(`/announcement/${props.match.params.announcement}/`)
      .then((res) => {
        setAnnouncement(res.data);
      });
  }, [props.location.key]);
  if (announcement !== "") {
    return (
      <Container className="article mt-4">
        <h1 className="list-title">{announcement.title}</h1>
        <p>
          {" "}
          <span className="list-time text-right">
            Uploaded on: {new Date(announcement.date_written).toDateString()}
          </span>
        </p>
        <div className="announcement-body text-justify">
          <div
            className="list-excerpt"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          ></div>
        </div>
        <p className="text-right list-excerpt mb-3">
          <b>-From :</b> The EliteManga Team
        </p>
      </Container>
    );
  } else {
    return (
      <div style={{ height: "200px" }}>
        <Loader active size="big"></Loader>
      </div>
    );
  }
}
