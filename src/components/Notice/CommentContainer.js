import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { Link } from 'react-router-dom';
import React from 'react';
import ListErrors from "../ListErrors";

const CommentContainer = props => {
  if (props.currentUser) {
    return (
      <div className="comment-container">
        <div>
          <ListErrors errors={props.errors}></ListErrors>
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    );
  } else {
    return (
      <div className="comment-container">
        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    );
  }
};

export default CommentContainer;