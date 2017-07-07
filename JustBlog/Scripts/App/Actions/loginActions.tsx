import dispatcher from '../dispatcher';
import * as Types from './actionTypes';

export function login(jwt: string) {
    //RouterContainer.get().transitionTo(‘/‘);
    localStorage.setItem("jwt", jwt);
    dispatcher.dispatch({
        type: Types.LOGIN_USER,
        data: jwt
    });
}