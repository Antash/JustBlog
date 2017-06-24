import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox/commentBox';
import PostEditor from './PostEditor/postEditor';

ReactDOM.render(
    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
    document.getElementById("commentBox")
);

ReactDOM.render(
    <PostEditor />,
    document.getElementById("postEditor")
);