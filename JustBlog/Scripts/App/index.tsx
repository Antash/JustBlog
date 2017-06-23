import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox/commentBox';

ReactDOM.render(
    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
    document.getElementById("container")
);