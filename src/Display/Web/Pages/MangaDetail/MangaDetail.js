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
            manga={this.props.match.params.manga}
            id={this.props.manga.id}
          />
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
