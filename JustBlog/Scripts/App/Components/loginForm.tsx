import React from 'react';

export default class LoginForm extends React.Component<{}, {}> {
    handleSubmit(e: any) {
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this) }>
                <input type="text" placeholder="User name" />
                <input type="text" placeholder="Password" />
                <input type="submit" value="Login" />
            </form>
            );
    }
}