import React, { useState, useEffect } from "react";
import {
  Comment,
  Form,
  Button,
  Icon,
  CardGroup,
  Label,
  Grid,
} from "semantic-ui-react";
import axios from "./../../../HOC/axiosConfig";
import { Row, Col } from "react-bootstrap";
import MangaIcon from "./../components/MangaCards/LastReadIcon";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Avatar from "@material-ui/core/Avatar";

const Review = (props) => {
  const [Reply, shouldReply] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [review, setReview] = useState("");
  const [replies, setReplies] = useState([]);
  const [liked, setLike] = useState(false);
  const [disliked, setDislike] = useState(false);
  const [likey, setLikey] = useState(props.likes);
  const [dislikey, setDislikey] = useState(props.dislikes);
  console.log(props.originality_score);

  const getReplies = () => {
    axios.get(`/review-comment/${props.id}/`).then((res) => {
      setReplies(res.data);
      setCollapse(!collapse);
    });
  };
  const delike = (choice) => {
    axios.get(`/devote-review/${props.id}/?choice=${choice}`);
    if (choice == "like") {
      setLike(false);
      setLikey(likey - 1);
      console.log("likey changed");
    }
    if (choice == "dislike") {
      setDislike(false);
      setDislikey(dislikey - 1);
    }
  };
  const like = () => {
    if (!props.isAuthenticated) {
      props.history.push("/login/");
    }
    if (liked == true) {
      delike("like");
    } else {
      axios.get(`/vote-review/${props.id}/?choice=like`).then((res) => {
        setLike(true);
        setLikey(likey + 1);
      });
    }
  };
  const dislike = () => {
    if (!props.isAuthenticated) {
      props.history.push("/login/");
    }
    if (disliked == true) {
      delike("dislike");
    } else {
      axios.get(`/vote-review/${props.id}/?choice=dislike`).then((res) => {
        setDislike(true);
        setDislikey(dislikey + 1);
      });
    }
  };
  const handleChange = (event) => {
    setReview(event.target.value);
  };

  console.log(liked, disliked);
  const { title, media_type, author, rank, alias, image_url } = props.media;
  return (
    <Row className="rev-row">
      <Col className="mt-4 mb-1" xs={12} md={9}>
        <Comment className="rev-comment">
          <Avatar src={props.author.avatar_thumbnail} />
          <Comment.Content className="rev-content">
            <Comment.Author as="a">
              <span className="mobile">
                {media_type === "0" ? "Manga" : "Anime"}: {title}
              </span>
              <span className="vanish">{props.author.username}</span>
            </Comment.Author>
            {/* <Comment.Metadata>
            <span>Today at 5:42PM</span>
          </Comment.Metadata> */}
            <Comment.Text>{props.content}</Comment.Text>
            <Comment.Metadata className="rev-meta-b">
              {props.originality_score !== 0 && (
                <>
                  <Grid className="vanish">
                    <Grid.Row columns={4} divided>
                      <Grid.Column>
                        Originality
                        <br />
                        {props.originality_score}/10
                      </Grid.Column>
                      <Grid.Column>
                        Plot
                        <br />
                        {props.plot_score}/10
                      </Grid.Column>
                      <Grid.Column>
                        Characters
                        <br />
                        {props.characters_score}/10
                      </Grid.Column>
                      <Grid.Column>
                        Quality
                        <br />
                        {props.quality_score}/10
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Row className="user-review-star mobile">
                    <Col className="star-item" xs={6} md={3}>
                      <Typography component="legend">Originality</Typography>
                      <Rating
                        readOnly
                        name="customized-empty"
                        value={props.originality_score / 2}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                    </Col>
                    <Col className="star-item" xs={6} md={3}>
                      <Typography component="legend">Plot</Typography>
                      <Rating
                        readOnly
                        name="customized-empty"
                        value={props.plot_score / 2}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                    </Col>
                    <Col className="star-item" xs={6} md={3}>
                      <Typography component="legend">Characters</Typography>
                      <Rating
                        readOnly
                        name="customized-empty"
                        value={props.characters_score / 2}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                    </Col>
                    <Col className="star-item" xs={6} md={3}>
                      <Typography component="legend">Quality</Typography>
                      <Rating
                        readOnly
                        name="customized-empty"
                        value={props.quality_score / 2}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                    </Col>
                  </Row>
                </>
              )}
              <Comment.Actions>
                <div className="text-right change">
                  {props.isAuthenticated && (
                    <Comment.Action>
                      <span>
                        {props.is_liked.like ? (
                          <Icon onClick={like} name="thumbs up" />
                        ) : (
                          <Icon onClick={like} name="thumbs up outline" />
                        )}
                      </span>
                      <span className="ml-2 mr-2">{likey}</span>
                      <span className="right-span mr-3" onClick={dislike}>
                        {props.is_liked.dislike ? (
                          <Icon name="thumbs down" />
                        ) : (
                          <Icon name="thumbs down outline" />
                        )}
                        <span className="ml-2 mr-2">{dislikey}</span>
                      </span>

                      {"   "}
                      <a
                        onClick={() => {
                          shouldReply(!Reply);
                        }}
                      >
                        Reply
                      </a>
                    </Comment.Action>
                  )}
                </div>
              </Comment.Actions>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
      </Col>
      <Col className="mt-4 bgt mb-4 vanish" xs={3}>
        <CardGroup itemsPerRow={2}>
          <MangaIcon
            title={title}
            author={author}
            loading={false}
            alias={alias}
            rank={rank}
            image_url={image_url}
            media_type={media_type}
          />
        </CardGroup>
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};
export default connect(mapStateToProps)(Review);
