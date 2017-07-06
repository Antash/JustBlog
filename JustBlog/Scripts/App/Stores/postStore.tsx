import { EventEmitter } from 'fbemitter';
import dispatcher from '../dispatcher';
import { Action } from '../Actions/action';
import * as Types from '../Actions/actionTypes';
import { IPostData, IPostAbstract } from '../Models/postData';

class PostStore extends EventEmitter {
    activePost: IPostData;
    loadedAbstracts: Array<IPostAbstract>;

    constructor() {
        super()
        this.loadedAbstracts = [];
        this.activePost = {
            abstract: {
                author: "Start Bootstrap",
                publishDate: "August 24, 2014",
                bgImageFileName: "post-bg.jpg",
                header: "Man must explore, and this is exploration at its greatest",
                subheader: "Problems look mighty small from 150 miles up",
                abstract: "hello post!"
            },
            text: "hello post!"
        };
    }

    getAllAbstracts(): Array<IPostAbstract> {
        return this.loadedAbstracts;
    }

    getActivePost(): IPostData {
        return this.activePost;
    }

    getActivePostAbstract(): IPostAbstract {
        return this.activePost.abstract;
    }

    handleActions(action: Action) {
        switch (action.type) {
            case Types.RECIEVE_ABSTRACTS: {
                this.loadedAbstracts = action.data.data;
                this.emit("change");
            }
            case Types.RECIEVE_POST: {
                this.activePost = action.data.data;
                this.emit("change");
            }
        }
    }
}

const postStore = new PostStore;
dispatcher.register(postStore.handleActions.bind(postStore));

export default postStore;