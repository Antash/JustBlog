import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export default class About extends React.Component<RouteComponentProps<{}>, {}> {
    render() {
        return (
            <div>
                hello about!
            </div>
        );
    }
}