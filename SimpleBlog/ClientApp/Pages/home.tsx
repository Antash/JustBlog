import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import CommentBox from '../Components/commentBox';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    render() {
        return (
            <div>
                <CommentBox />
            </div>
        );
    }
}