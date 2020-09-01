import React, { useState, useEffect } from "react";
import { Comment, Form, Icon, Label, Grid } from "semantic-ui-react";
import Replies from "./Reply";
import axios from "./../../../../HOC/axiosConfig";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { Row, Col } from "react-bootstrap";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";

const Review = (props) => {
  const [Reply, shouldReply] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [review, setReview] = useState("");
  const [replies, setReplies] = useState([]);
  const [liked, setLike] = useState(false);
  const [disliked, setDislike] = useState(false);
  const [likey, setLikey] = useState(props.likes);
  const [dislikey, setDislikey] = useState(props.dislikes);
  const [posted, setPosted] = useState(false);

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
  const submitReview = () => {
    axios
      .post(`/user-review/${props.id}/add_comment/`, {
        content: review,
      })
      .then((res) => {
        setPosted(true);
      });
  };
  console.log(props);

  return (
    <Comment>
      <Avatar src={props.author.avatar_thumbnail} />
      <Comment.Content>
        <Comment.Author as="a">{props.author.username}</Comment.Author>
        {/* <Comment.Metadata>
            <span>Today at 5:42PM</span>
          </Comment.Metadata> */}
        <Comment.Text>{props.content}</Comment.Text>
        <Comment.Metadata className="rev-meta">
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
        </Comment.Metadata>
        <Comment.Actions>
          <div className="text-right">
            <Comment.Action>
              <span>
                {props.isAuthenticated &&
                props.is_liked.like !== undefined &&
                props.is_liked.like ? (
                  <Icon onClick={like} name="thumbs up" />
                ) : (
                  <Icon onClick={like} name="thumbs up outline" />
                )}
              </span>
              <span className="ml-2 mr-2">{likey}</span>
              <span className="right-span mr-3" onClick={dislike}>
                {props.isAuthenticated &&
                props.is_liked.dislike !== undefined &&
                props.is_liked.dislike ? (
                  <Icon name="thumbs down" />
                ) : (
                  <Icon name="thumbs down outline" />
                )}
                <span className="ml-2 mr-2">{dislikey}</span>
              </span>

              {"   "}
              {props.isAuthenticated && (
                <a
                  onClick={() => {
                    shouldReply(!Reply);
                  }}
                >
                  Reply
                </a>
              )}
            </Comment.Action>

            {props.comment_number > 0 && (
              <Comment.Action onClick={getReplies}>
                {props.comment_number}{" "}
                {props.comment_number == 1 ? "Reply" : "Replies"}
              </Comment.Action>
            )}
          </div>
        </Comment.Actions>
        {Reply && (
          <Form id="a-form" onSubmit={submitReview} reply>
            <Form.TextArea
              className="input-review"
              value={review}
              onChange={handleChange}
            />
            <Button className="e-button" variant="contained">
              <EditIcon />
              Submit reply
            </Button>
            {posted && (
              <Alert variant="success">
                <Alert.Heading>Your comment has been posted</Alert.Heading>
                Reload the page to see changes
              </Alert>
            )}
          </Form>
        )}
      </Comment.Content>

      {replies.length > 0 && (
        <Comment.Group collapsed={collapse}>
          {replies.map((item) => (
            <div key={item.id}>
              <Replies {...item} />
            </div>
          ))}
        </Comment.Group>
      )}
    </Comment>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};
export default connect(mapStateToProps)(withRouter(Review));
