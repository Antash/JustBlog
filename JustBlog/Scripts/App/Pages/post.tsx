import React from 'react';
import postStore from '../Stores/postStore';
import { IPostData, IPostAbstract } from '../Models/postData';
import * as PostActions from '../Actions/postActions';

export interface IPostProps {
    id?: number;
}

export default class Post extends React.Component<IPostProps, IPostData> {
    constructor() {
        super();
        this.state = postStore.getActivePost();
    }

    componentDidMount() {
        PostActions.loadPost(this.props.id);
    }

    componentWillMount() {
        postStore.addListener("change", () => {
            this.setState(postStore.getActivePost());
        });
    }

    componentWillUnmount() {
        postStore.removeAllListeners();
    }

    getHtmlContent() {
        return { __html: this.state.text };
    }

    render() {
        console.log();
        return (
            <article>
                <span dangerouslySetInnerHTML={this.getHtmlContent()} />
            </article>
        );
    }
}