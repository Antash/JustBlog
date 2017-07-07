import React from 'react';
import loginStore from '../Stores/loginStore';

export default class About extends React.Component<{}, {}> {
    static willTransitionTo(transition) {
        if (!loginStore.isLoggenIn()) {
            transition.redirect("/login");
        }
    }

    render() {
        return (
            <div>
                hello manager!
            </div>
        );
    }
}