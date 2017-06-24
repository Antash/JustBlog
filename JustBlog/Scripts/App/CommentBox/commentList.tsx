import React from 'react';
import Comment from './comment'
import { ICommentData } from './commentData'

export interface ICommentListProps {
    data: Array<ICommentData>;
}

export default class CommentList extends React.Component<ICommentListProps, {}> {
    render() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}