import * as React from 'react';
import Remarkable from 'remarkable';
import { ICommentData } from "../../Models/commentData";
import * as CommentActions from '../../Actions/commentActions';

export interface ICommentProps {
    comment: ICommentData;
}

export default class Comment extends React.Component<ICommentProps, {}> {
    delete() {
        let id = this.props.comment.id as number;
        CommentActions.deleteComment(id);
    }

    like() {
        let id = this.props.comment.id as number;
        CommentActions.likeComment(id);
    }

    rawMarkup() {
        var md = new Remarkable();
        let content = this.props.children as any;
        var rawMarkup = md.render(content.toString());
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