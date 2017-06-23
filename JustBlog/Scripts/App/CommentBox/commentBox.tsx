import React from 'react';
import CommentForm from './commentForm'
import CommentList from './commentList'
import { ICommentData } from './comment'

export interface ICommentBoxProps {
    url: string;
    submitUrl: string;
    pollInterval: number;
}

interface ICommentBoxState {
    data: Array<ICommentData>;
}

export class CommentBox extends React.Component<ICommentBoxProps, ICommentBoxState> {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    loadCommentsFromServer() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    }

    handleCommentSubmit(comment: ICommentData) {
        var data = new FormData();
        data.append('Author', comment.author);
        data.append('Text', comment.text);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadCommentsFromServer();
        }.bind(this);
        xhr.send(data);
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
}

export default CommentBox;