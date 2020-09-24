//UserManga, Manga endpoint
import React from "react";
import MangaIcon from "./../components/MangaCards/SingleManga";
import { Paper } from "@material-ui/core";
import { Divider } from "semantic-ui-react";
import ChapterList from "./../ChapterList/ChapterList";
import { GetManga } from "./../../../HOC/manga/GetManga";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Info from "./Info";
import SimilarManga from "./SimilarManga";
import axios from "axios";

class MangaDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manga: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.manga.id != this.props.manga.id) {
      axios.get(`mixed/${this.props.manga.id}/increment_weekly_reads/`);
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Helmet>
          <title>{`${this.props.manga.title} - EliteManga`}</title>
          <meta
            name="description"
            content={`${this.props.manga.description}`}
          />
        </Helmet>

        <div className="recent-paper">
          {this.props.loading != true && (
            <MangaIcon
              col_size={12}
              mobile={window.innerWidth < 768}
              myclass="break-manga"
              loading={this.props.loading}
              adaptation={this.props.manga.adaptation}
              title={this.props.manga.title}
              alias={this.props.manga.alias}
              author={this.props.manga.author}
              rank={this.props.manga.rank}
              add_to_favorites={this.add_to_favorites}
              last_read={this.state.manga.last_read}
              media_type={this.props.manga.media_type}
              is_favorite={this.state.manga.isfavorite}
              image_url={this.props.manga.image_url}
              description={this.props.manga.description}
            />
          )}
          <br />

          <Info
            data={this.props.manga}
            manga={this.props.match.params.manga}
            elitemangareview={this.props.manga.elitemangareview}
          />
          <br />
          <SimilarManga
            adaptation={this.props.manga.adaptation}
            manga={this.props.match.params.manga}
            id={this.props.manga.id}
          />
          <div className="d-flex justify-content-center ml-auto mt-3">
            <iframe
              src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=48&l=ur1&category=amazonhomepage&f=ifr&linkID=7112377050b0f1143dafb671e5cfbb33&t=avowed-20&tracking_id=avowed-20"
              width="720"
              height="90"
              className="vanish"
              scrolling="no"
              border="0"
              marginwidth="0"
              style={{ border: "none", alignSelf: "center" }}
              frameborder="0"
            ></iframe>
            <iframe
              src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=amazonhomepage&f=ifr&linkID=e18a90342955862047c8b9d46ee91a2d&t=avowed-20&tracking_id=avowed-20"
              width="320"
              height="50"
              scrolling="no"
              border="0"
              marginwidth="0"
              style={{ border: "none" }}
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isauthenticated: state.auth.token != null,
  };
};
export default compose(connect(mapStateToProps), GetManga)(MangaDetail);
