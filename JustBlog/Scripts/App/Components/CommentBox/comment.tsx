import React from 'react';
import Remarkable from 'remarkable';
import { ICommentData } from "../../Models/commentData";
import * as CommentActions from '../../Actions/commentActions';

export interface ICommentProps {
    comment: ICommentData;
    children?: string;
}

export default class Comment extends React.Component<ICommentProps, {}> {
    delete() {
        CommentActions.deleteComment(this.props.comment.id);
    }

    like() {
        CommentActions.likeComment(this.props.comment.id);
    }

    rawMarkup() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.comment.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <h3>liked: {this.props.comment.likes}</h3>
                <button onClick={this.delete.bind(this)}>Delete</button>
                <button onClick={this.like.bind(this)}>Like!</button>
            </div>
        );
    }
}