import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox/commentBox';
import PostEditor from './PostEditor/postEditor';

ReactDOM.render(
    <CommentBox
        url="/comments"
        submitUrl="/comments/new"
        deleteUrl="/comments/del"
        likeUrl="/comments/like" />,
    document.getElementById("commentBox")
);

ReactDOM.render(
    <PostEditor />,
    document.getElementById("postEditor")
);