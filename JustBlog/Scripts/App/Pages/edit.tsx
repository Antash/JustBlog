import React from 'react';
import PostEditor from '../Components/postEditor';

export default class Edit extends React.Component<{}, {}> {
    post() {

    }

    render() {
        return (
            <div>
                <PostEditor />
                <button type="submit" onClick={this.post.bind(this)}>Publish</button>
            </div>
        );
    }
}