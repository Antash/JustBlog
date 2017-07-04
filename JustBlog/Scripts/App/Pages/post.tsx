import React from 'react';
import PostEditor from '../Components/postEditor';

export default class Home extends React.Component<{}, {}> {
    render() {
        console.log(this.props);
        return (
            <div>
                <PostEditor />
            </div>
        );
    }
}