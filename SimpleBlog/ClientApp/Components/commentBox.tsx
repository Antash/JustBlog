import * as React from 'react';
import CommentForm from './CommentBox/commentForm';
import CommentList from './CommentBox/commentList';
import commentStore from '../Stores/commentStore';
import { ICommentData } from '../Models/commentData';
import * as CommentActions from '../Actions/commentActions';

interface ICommentBoxState {
    data: Array<ICommentData>;
}

export default class CommentBox extends React.Component<{}, ICommentBoxState> {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        CommentActions.loadComments();
    }

    componentWillMount() {
        commentStore.addListener("change", () => {
            this.setState({
                data: commentStore.getAllComments()
            });
        });
    }

    componentWillUnmount() {
        commentStore.removeAllListeners();
    }

    render() {
        return (
            <div className="commentBox">
                <h3>Comments</h3>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
}