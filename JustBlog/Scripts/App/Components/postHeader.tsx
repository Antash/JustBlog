import React from 'react';
import postStore from '../Stores/postStore';
import { IPostAbstract } from '../Models/postData';

export default class PostHeader extends React.Component<{}, IPostAbstract> {
    constructor() {
        super();
        this.state = postStore.getActivePostAbstract();
    }

    componentWillMount() {
        postStore.addListener("change", () => {
            this.setState(postStore.getActivePostAbstract());
        });
    }

    componentWillUnmount() {
        postStore.removeAllListeners();
    }

    render() {
        const imageStyle = {
            backgroundImage: "url('Content/Images/" + this.state.bgImageFileName + "')"
        };
        return (
            <header className="intro-header" style={imageStyle}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <div className="post-heading">
                                <h1>{this.state.header}</h1>
                                <h2 className="subheading">{this.state.subheader}</h2>
                                <span className="meta">Posted by <a href="#">{this.state.author}</a> on {this.state.publishDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}