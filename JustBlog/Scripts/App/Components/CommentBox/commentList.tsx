import React from 'react';
import Comment from './comment';
import { ICommentData } from "../../Models/commentData";

export interface ICommentListProps {
    data: Array<ICommentData>;
}

export default class CommentList extends React.Component<ICommentListProps, {}> {
    render() {
        var commentNodes = this.props.data.map(function (comment: ICommentData) {
            return (
                <Comment
                    key={comment.id}
                    comment={comment}>
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