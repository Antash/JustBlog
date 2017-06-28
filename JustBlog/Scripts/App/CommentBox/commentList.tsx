import React from 'react';
import Comment from './comment'
import { ICommentData } from './commentData'

export interface ICommentListProps {
    data: Array<ICommentData>;
    onCommentDelete: (id: number) => void;
    onCommentLike: (id: number) => void;
}

export default class CommentList extends React.Component<ICommentListProps, {}> {
    render() {
        var commentNodes = this.props.data.map(function (comment: ICommentData) {
            return (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onCommentDelete={this.props.onCommentDelete}
                    onCommentLike={this.props.onCommentLike}>
                    {comment.text}
                </Comment>
            );
        }.bind(this));
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}