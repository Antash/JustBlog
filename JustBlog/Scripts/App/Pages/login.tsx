import React from 'react';
import { Redirect } from 'react-router';
import LoginForm from '../Components/loginForm';
import loginStore from '../Stores/loginStore';

interface ILoginState {
    loggedIn: boolean;
}

export default class Login extends React.Component<{}, ILoginState> {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        };
    }

    componentWillMount() {
        loginStore.addListener("change", () => {
            this.setState({
                loggedIn: loginStore.isLoggedIn()
            });
        });
    }

    componentWillUnmount() {
        loginStore.removeAllListeners();
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to='/' />;
        }
        return <LoginForm />;
    }
}