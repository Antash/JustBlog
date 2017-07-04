import axios from 'axios';
import qs from 'qs';
import dispatcher from '../dispatcher';
import * as Types from './actionTypes';
import { ICommentData } from "../Models/commentData";

export function loadComments() {
    dispatcher.dispatch({
        type: Types.FETCH_COMMENTS
    });
    axios.get("/comments")
        .then(response => dispatcher.dispatch({
            type: Types.RECIEVE_COMMENTS,
            data: response.data
        }))
        .catch(error => dispatcher.dispatch({
            type: Types.FETCH_COMMENTS_ERROR,
            data: error
        }));
}

export function addComment(comment: ICommentData) {
    axios.post("/comments/new", qs.stringify({ Author: comment.author, Text: comment.text }))
        .then(response => loadComments());
}

export function likeComment(id: number) {
    axios.post("/comments/like", qs.stringify({ Id: id }))
        .then(response => loadComments());
}

export function deleteComment(id: number) {
    axios.post("/comments/del", qs.stringify({ Id: id }))
        .then(response => loadComments());
}