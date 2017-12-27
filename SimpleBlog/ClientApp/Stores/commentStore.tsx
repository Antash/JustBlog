import { EventEmitter } from 'fbemitter';
import dispatcher from '../dispatcher';
import { IAction as Action } from '../Actions/action';
import * as Types from '../Actions/actionTypes';
import { ICommentData } from '../Models/commentData';

class CommentStore extends EventEmitter {
    data: Array<ICommentData>;

    constructor() {
        super();
        this.data = [];
    }

    getAllComments(): Array<ICommentData> {
        return this.data;
    }

    handleActions(action: Action) {
        switch (action.type) {
            case Types.RECIEVE_COMMENTS: {
                this.data = action.data.data;
                this.emit("change");
            }
        }
    }
}

const commentStore = new CommentStore;
dispatcher.register(commentStore.handleActions.bind(commentStore));

export default commentStore;