import * as React from 'react';
import loginStore from '../Stores/loginStore';
import { ILoginState } from '../loginState';

export default class AuthComponent extends React.Component<{}, ILoginState> {
    constructor() {
        super();
        this.state = this.getLoginState();
    }

    static willTransitionTo(transition : any) {
        if (!loginStore.isLoggedIn()) {
            transition.redirect("/login");
        }
    }

    getLoginState(): ILoginState {
        return {
            loggedIn: loginStore.isLoggedIn()
        };
    }

    componentDidMount() {
        loginStore.addListener("change", this.onChange.bind(this));
    }

    onChange() {
        this.setState(this.getLoginState());
    }

    componentWillUnmount() {
        loginStore.removeAllListeners();
    }
}