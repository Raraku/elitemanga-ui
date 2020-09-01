import React, { useState, useEffect } from "react";
import {
  Comment,
  Header,
  Form,
  Button,
  Segment,
  Icon,
} from "semantic-ui-react";
import axios from "axios";
import debounce from "lodash.debounce";
import Review from "./Comment";
import axiosConfig from "./../../../../HOC/axiosConfig";
import { connect } from "react-redux";
import { red } from "@material-ui/core/colors";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import MuiButton from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: true,
      comments: [],
      review: "",
      originality: "",
      plot: "",
      characters: "",
      quality: "",
      scores: false,
      next: "",
      errors: {
        review: "",
        originality: "",
        plot: "",
        characters: "",
        quality: "",
      },
      posted: false,
    };
    this.textInput = React.createRef();
  }
  loadMoreComments = () => {
    axiosConfig
      .get(this.state.next)
      .then((res) => {
        this.setState({
          isLoading: false,
          comments: [...this.state.comments, ...res.data.results],
          next: res.data.next,
        });
        this.setState({ hasMore: this.state.comments.length < res.data.count });
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({ error: err.message, isLoading: false });
      });
  };
  loadComments = () => {
    axiosConfig
      .get(`/mixed/${this.props.id}/get_reviews/`)
      .then((res) => {
        this.setState({
          isLoading: false,
          comments: res.data.results,
          next: res.data.next,
        });
        console.log(res.data);
        this.setState({ hasMore: this.state.comments.length < res.data.count });
      })
      .catch((err) => {
        this.setState({ error: err.message, isLoading: false });
      });
  };
  componentDidMount() {
    this.loadComments();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.loadComments();
    }
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "review":
        errors.review = value === "" ? "This field cannot be empty" : "";
        break;
      default:
        console.log(errors[name]);
        errors[name] = value > 10 ? "Enter a value less than 10" : "";

        errors[name] =
          value.length < 1 ? "Please fill in this field" : errors[name];
        break;
    }
    this.setState({ errors, [name]: value });
    // this.setState({ [event.target.name]: event.target.value });
  };

  submitReview = () => {
    if (this.state.scores == false) {
      axiosConfig
        .post(`/mixed/${this.props.id}/add_review/`, {
          content: this.state.review,
        })
        .then((res) => {
          this.setState({ posted: true });
        });
    }
    if (this.state.scores == true) {
      axiosConfig
        .post(`/mixed/${this.props.id}/add_review/`, {
          content: this.state.review,
          originality_score: this.state.originality,
          plot_score: this.state.plot,
          characters_score: this.state.characters,
          quality_score: this.state.quality,
          scores: "1",
        })
        .then((res) => {
          this.setState({ posted: true });
        });
    }
  };
  changeScore = (event) => {
    this.setState({
      scores: !this.state.scores,
      errors: {
        ...this.state.errors,
        originality: "",
        plot: "",
        characters: "",
        quality: "",
      },
      originality: "",
      plot: "",
      characters: "",
      quality: "",
    });
  };

  render() {
    console.log(this.state);
    const valid = validateForm(this.state.errors);
    const { error, hasMore, isLoading, comments } = this.state;
    return (
      <div>
        <Comment.Group>
          <Header className="chameleon" as-="h3" dividing>
            User Reviews
          </Header>

          {comments.length !== 0 ? (
            comments.map((comment) => (
              <Review
                key={comment.id}
                {...comment}
                isAuthenticated={this.props.isAuthenticated}
              />
            ))
          ) : (
            <Segment placeholder>
              <Header icon>
                <Icon name="question circle" />
                No Reviews yet. Wanna share your thoughts? Add one below
              </Header>
              {this.props.isAuthenticated ? (
                <Button
                  onClick={() => {
                    this.textInput.current.focus();
                  }}
                  primary
                >
                  Post Review
                </Button>
              ) : (
                <Button className="outline-primary" as={Link} to="/login/">
                  Login to post your review
                </Button>
              )}
            </Segment>
          )}
        </Comment.Group>

        {this.props.isAuthenticated ? (
          <Form className="form-review" onSubmit={this.submitReview}>
            <Form.Field>
              <label>Review</label>
              <textarea
                name="review"
                className={
                  this.state.errors.review !== ""
                    ? "has-error input-review"
                    : "input-review"
                }
                ref={this.textInput}
                value={this.state.review}
                onChange={this.handleChange}
              />
            </Form.Field>
            {this.state.nullError && (
              <p className="text-danger">This field cannot be left blank</p>
            )}
            <Form.Field>
              <Form.Checkbox
                value={this.state.scores}
                onChange={this.changeScore}
                label="Include Scores"
              />
            </Form.Field>
            {this.state.scores && (
              <Form.Group>
                <Form.Input
                  error={
                    this.state.errors.originality
                      ? {
                          content: this.state.errors.originality,
                          pointing: "below",
                        }
                      : false
                  }
                  fluid
                  className="point-form"
                  type="number"
                  label="Originality Score"
                  name="originality"
                  value={this.state.originality}
                  onChange={this.handleChange}
                  id="form-input-originality"
                />
                <Form.Input
                  error={
                    this.state.errors.plot
                      ? {
                          content: this.state.errors.plot,
                          pointing: "below",
                        }
                      : false
                  }
                  fluid
                  type="number"
                  className="point-form"
                  label="Plot Score"
                  name="plot"
                  value={this.state.plot}
                  onChange={this.handleChange}
                  id="form-input-plot"
                />
                <Form.Input
                  error={
                    this.state.errors.characters
                      ? {
                          content: this.state.errors.characters,
                          pointing: "below",
                        }
                      : false
                  }
                  fluid
                  type="number"
                  label="Characters Score"
                  name="characters"
                  className="point-form"
                  value={this.state.characters}
                  onChange={this.handleChange}
                  id="form-input-characters"
                />
                <Form.Input
                  error={
                    this.state.errors.quality
                      ? {
                          content: this.state.errors.quality,
                          pointing: "below",
                        }
                      : false
                  }
                  fluid
                  type="number"
                  label="Quality Score"
                  name="quality"
                  className="point-form"
                  value={this.state.quality}
                  onChange={this.handleChange}
                  id="form-input-quality"
                />
              </Form.Group>
            )}
            {this.state.posted && (
              <Alert variant="success">
                <Alert.Heading>Your review has been posted</Alert.Heading>
                Reload the page to see changes
              </Alert>
            )}
            <MuiButton
              disabled={!valid || this.state.review === ""}
              variant="contained"
              onClick={this.submitReview}
              className="e-button"
            >
              <EditIcon />
              Add Review
            </MuiButton>
          </Form>
        ) : (
          <Alert variant="danger">
            <Alert.Link as={Link} to="/login/">
              Log in
            </Alert.Link>{" "}
            to drop a review or reply
          </Alert>
        )}
        <br />
        {hasMore && (
          <Button onClick={this.loadMoreComments} attached="bottom">
            Load More
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};
export default connect(mapStateToProps)(Comments);
