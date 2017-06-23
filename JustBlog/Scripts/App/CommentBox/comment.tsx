import React from 'react';
import Remarkable from 'remarkable';

export interface ICommentData {
    id?: number;
    author: string;
    text: string;
}

interface ICommentProps extends React.HTMLProps<HTMLDivElement> {
    author: string
};

export class Comment extends React.Component<{ children: string, author: string }, {}> {
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
            </div>
        );
    }
};