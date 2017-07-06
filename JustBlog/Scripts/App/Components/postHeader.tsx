import React from 'react';
import postStore from '../Stores/postStore';

export default class PostHeader extends React.Component<{}, {}> {

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
        const imageStyle = {
            backgroundImage: "url('Content/Images/" + this.props.imageFileName + "')"
        };
        return (
            <header className="intro-header" style={imageStyle}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <div className="post-heading">
                                <h1>{this.props.header}</h1>
                                <h2 class="subheading">Problems look mighty small from 150 miles up</h2>
                                <span class="meta">Posted by <a href="#">Start Bootstrap</a> on August 24, 2014</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}