import dispatcher from '../dispatcher';
import * as Types from './actionTypes';

export function login() {
    dispatcher.dispatch({
        type: Types.LOGIN_USER,
        data: "login"
    });
}