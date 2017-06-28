import React from 'react';
import Remarkable from 'remarkable';

export interface ICommentProps {
    id: number;
    author: string;
    children?: string;
    onCommentDelete: (id: number) => void;
}

export default class Comment extends React.Component<ICommentProps, {}> {
    delete() {
        this.props.onCommentDelete(this.props.id);
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
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <button onClick={this.delete.bind(this)}>Delete</button>
            </div>
        );
    }
}