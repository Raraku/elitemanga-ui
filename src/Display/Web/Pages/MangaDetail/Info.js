import React from "react";
import { Tab, Segment } from "semantic-ui-react";
import UserReview from "./DetailTabs/UserReview";
import Review from "./DetailTabs/ElitemangaReview";
import MangaInfo from "./DetailTabs/MangaInfo";
import Readon from "./DetailTabs/Readon";

const Info = (props) => {
  console.log(props.data);
  const panes = [
    {
      menuItem: "Info",
      render: () => (
        <Tab.Pane attached>
          <Segment>
            <MangaInfo data={props.data} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "EliteManga Review",
      render: () => (
        <Tab.Pane attached={true}>
          <Segment>
            <Review
              media_type={props.data.media_type}
              elitemangareview={props.elitemangareview}
            />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      menuItem: `${props.data.media_type == "0" ? "Read on" : "Watch on"}`,
      render: () => (
        <Tab.Pane attached={true}>
          <Segment>
            <Readon sources={props.data.sources} id={props.data.id} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "User Reviews",
      render: () => (
        <Tab.Pane attached={true}>
          <Segment>
            <UserReview manga={props.manga} id={props.data.id} />
          </Segment>
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div style={{ position: "relative" }}>
      <Tab
        className="tab-marg switch0"
        id="tab-marg"
        menu={{ pointing: true, secondary: true, fluid: true }}
        menuPosition="left"
        panes={panes}
      />

      <Tab
        className="tab-marg switch1"
        id="tab-marg"
        menu={{ pointing: true, vertical: true, fluid: true }}
        menuPosition="left"
        panes={panes}
      />
    </div>
  );
};
export default Info;
