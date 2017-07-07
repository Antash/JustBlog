import { EventEmitter } from 'fbemitter';
import dispatcher from '../dispatcher';
import { Action } from '../Actions/action';
import * as Types from '../Actions/actionTypes';

class LoginStore extends EventEmitter {
    constructor() {
        super()
    }

    handleActions(action: Action) {
        switch (action.type) {
            case Types.LOGIN_USER: {
                this.emit("change");
            }
        }
    }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;