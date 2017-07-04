import React from 'react';
import CommentBox from '../Components/commentBox';

export default class Home extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <CommentBox />
            </div>
        );
    }
}