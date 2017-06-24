import React from 'react';
import CommentForm from './commentForm'
import CommentList from './commentList'
import { ICommentData } from './commentData'

export interface ICommentBoxProps {
    url: string;
    submitUrl: string;
}

interface ICommentBoxState {
    obj: { data: Array<ICommentData> };
}

export default class CommentBox extends React.Component<ICommentBoxProps, ICommentBoxState> {
    constructor() {
        super();
        this.state = {
            obj: { data: []}
        };
    }

    loadCommentsFromServer() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ obj: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadCommentsFromServer();
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
                <h3>Comments</h3>
                <CommentList data={this.state.obj.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
}