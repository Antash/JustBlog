import React from 'react';
import { ILoginData } from '../Models/loginData';
import authService from '../Services/authService';

export default class LoginForm extends React.Component<{}, ILoginData> {
    constructor() {
        super();
        this.state = {
            userName: "",
            password: ""
        };
    }

    handleUserChange(e: any) {
        this.setState({ userName: e.target.value });
    }

    handlePasswordChange(e: any) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e: any) {
        e.preventDefault();
        authService.login(this.state);
    }

    render() {
        return (
            <form className="loginForm" onSubmit={this.handleSubmit.bind(this) }>
                <input type="text"
                    placeholder="Login"
                    value={this.state.userName}
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