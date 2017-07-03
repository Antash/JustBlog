import React from 'react';
import CommentForm from './CommentBox/commentForm'
import CommentList from './CommentBox/commentList'
import { ICommentData } from './CommentBox/commentData'
import { Ajax } from '../Utils/ajax'

export interface ICommentBoxProps {
    url: string;
    submitUrl: string;
    deleteUrl: string;
    likeUrl: string;
}

interface ICommentBoxState {
    data: Array<ICommentData>;
}

export default class CommentBox extends React.Component<ICommentBoxProps, ICommentBoxState> {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    loadCommentsFromServer() {
        Ajax.get(this.props.url, this.setState.bind(this));
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    handleCommentSubmit(comment: ICommentData) {
        var data = new FormData();
        data.append('Author', comment.author);
        data.append('Text', comment.text);
        Ajax.post(this.props.submitUrl, data, this.loadCommentsFromServer.bind(this));
    }

    handleCommentDelete(id: number) {
        var data = new FormData();
        data.append('Id', id);
        Ajax.post(this.props.deleteUrl, data, this.loadCommentsFromServer.bind(this));
    }

    handleCommentLike(id: number) {
        var data = new FormData();
        data.append('Id', id);
        Ajax.post(this.props.likeUrl, data, this.loadCommentsFromServer.bind(this));
    }

    render() {
        return (
            <div className="commentBox">
                <h3>Comments</h3>
                <CommentList
                    data={this.state.data}
                    onCommentDelete={this.handleCommentDelete.bind(this)}
                    onCommentLike={this.handleCommentLike.bind(this)} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
}