import React from 'react';
import { ICommentData } from './comment'

export interface ICommentFormProps {
    onCommentSubmit: (comment: ICommentData) => void;
}

export default class CommentForm extends React.Component<ICommentFormProps, ICommentData> {
    constructor() {
        super();
        this.state = {
            author: '',
            text: ''
        };
    }
    handleAuthorChange(e : any) {
        this.setState({ author: e.target.value });
    }
    handleTextChange(e: any) {
        this.setState({ text: e.target.value });
    }
    handleSubmit(e: any) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    }
    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange.bind(this)}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange.bind(this)}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
};