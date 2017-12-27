import axios from 'axios';
import * as qs from 'qs';
import dispatcher from '../dispatcher';
import * as Types from './actionTypes';
import { ICommentData } from "../Models/commentData";

export function loadComments() {
    dispatcher.dispatch({
        type: Types.FETCH_COMMENTS
    });
    axios.get("/api/comments")
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
    axios.post("/api/comments", qs.stringify({ Author: comment.author, Text: comment.text }))
        .then(response => loadComments());
}

export function likeComment(id: number) {
    axios.get("/api/comments/like/" + id)
        .then(response => loadComments());
}

export function deleteComment(id: number) {
    axios.delete("/api/comments/" + id )
        .then(response => loadComments());
}