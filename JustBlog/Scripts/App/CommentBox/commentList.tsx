import React from 'react';
import {Comment, ICommentData} from './comment'

export interface ICommentListProps {
    data: Array<ICommentData>;
}

export default class CommentList extends React.Component<ICommentListProps, {}> {
    render() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id} children={comment.text}>
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
};