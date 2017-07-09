import { EventEmitter } from 'fbemitter';
import dispatcher from '../dispatcher';
import { Action } from '../Actions/action';
import * as Types from '../Actions/actionTypes';

class LoginStore extends EventEmitter {
    loginStatus: boolean;

    constructor() {
        super();
        this.loginStatus = false;
    }

    isLoggedIn(): boolean {
        return this.loginStatus;
    }

    handleActions(action: Action) {
        switch (action.type) {
            case Types.LOGIN_USER: {
                this.loginStatus = true;
                this.emit("change");
            }
        }
    }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;