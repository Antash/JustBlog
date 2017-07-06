import React from 'react';
import postStore from '../Stores/postStore';
import { IPostData, IPostAbstract } from '../Models/postData';

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
    render() {
        console.log();
        return (
            <article>
                <span dangerouslySetInnerHTML={this.state.text} />
            </article>
        );
    }
}