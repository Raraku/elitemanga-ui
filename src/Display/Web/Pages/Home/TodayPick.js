import axios from "axios";
import React from "react";
import MangaIcon from "../components/MangaCards/SingleManga";
import Loader from "../../utils/Loader";
import { Link } from "react-router-dom";

export default class TodayPick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayPick: {},
      loading: true,
    };
  }
  componentDidMount() {
    axios.get("mixed/todays_pick/").then((res) => {
      this.setState({ todayPick: res.data, loading: false });
    });
  }
  render() {
    console.log(this.state.todayPick);
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <Link
        to={
          this.state.todayPick.media_type == 0
            ? `/manga/${this.state.todayPick.alias}/`
            : `/anime/${this.state.todayPick.alias}`
        }
        className="mt-4 ml-2 troeo"
      >
        <div className="treso">
          {" "}
          <h3 className="ml-4 pickText">Today's Pick</h3>
        </div>
        <MangaIcon
          col_size={12}
          mobile={window.innerWidth < 768}
          myclass="break-manga"
          loading={this.state.loading}
          title={this.state.todayPick.title}
          alias={this.state.todayPick.alias}
          author={this.state.todayPick.author}
          rank={this.state.todayPick.rank}
          media_type={this.state.todayPick.media_type}
          image_url={this.state.todayPick.image_url}
          description={this.state.todayPick.description}
        />
      </Link>
    );
  }
}
