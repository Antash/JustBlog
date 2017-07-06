import React from 'react';
import { ILoginData } from '../Models/loginData';

export default class LoginForm extends React.Component<{}, ILoginData> {
    constructor() {
        super();
        this.state = {
            user: "",
            password: ""
        };
    }

    handleUserChange(e: any) {
        this.setState({ user: e.target.value });
    }

    handlePasswordChange(e: any) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e: any) {
        e.preventDefault();
    }

    render() {
        return (
            <form className="loginForm" onSubmit={this.handleSubmit.bind(this) }>
                <input type="text"
                    placeholder="Login"
                    value={this.state.user}
                    onChange={this.handleUserChange.bind(this)} />
                <input type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange.bind(this)} />
                <input type="submit" value="Login" />
            </form>
            );
    }
}