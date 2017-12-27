import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import PostEditor from '../Components/postEditor';

export default class Edit extends React.Component<RouteComponentProps<{}>, {}> {
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