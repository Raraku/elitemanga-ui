import React, { useState } from "react";
import { Comment } from "semantic-ui-react";
import Avatar from "@material-ui/core/Avatar";

const Reply = (props) => {
  return (
    <Comment>
      <Avatar src={props.author.avatar_thumbnail} />
      <Comment.Content>
        <Comment.Author as="a">{props.author.username}</Comment.Author>

        <Comment.Text>{props.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};
export default Reply;
