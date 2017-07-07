import dispatcher from '../dispatcher';
import * as Types from './actionTypes';

export function login() {
    //localStorage.setItem("jwt", jwt);
    dispatcher.dispatch({
        type: Types.LOGIN_USER,
        data: "login"
    });
}