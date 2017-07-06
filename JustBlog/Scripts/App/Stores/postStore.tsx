import { EventEmitter } from 'fbemitter';
import dispatcher from '../dispatcher';
import { Action } from "../Actions/action";
import * as Types from '../Actions/actionTypes';

class PostStore extends EventEmitter {
    handleActions(action: Action) {
        switch (action.type) {
            case Types.RECIEVE_COMMENTS: {
                this.data = action.data.data;
                this.emit("change");
            }
        }
    }
}

const postStore = new PostStore;
dispatcher.register(postStore.handleActions.bind(postStore));

export default postStore;