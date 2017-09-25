import axios from 'axios';
import _ from 'lodash';
import {
  FETCH_POST_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  FETCH_COMMENTS_COUNT,
  FETCH_COMMENT,
  VOTE_COMMENT,
} from './types';
import {url, authHeader} from './constants';
import {guid} from './helper';

axios.defaults.headers.common['Authorization'] = authHeader;

export function voteComment(id, vote) {
  return dispatch => {
    axios
      .post(`${url}/comments/${id}`, {option: vote})
      .then(res => dispatch({type: VOTE_COMMENT, payload: res.data}));
  };
}

export function fetchPostComments(postId) {
  return dispatch => {
    axios
      .get(`${url}/posts/${postId}/comments`)
      .then(res => dispatch({type: FETCH_POST_COMMENTS, payload: res.data}));
  };
}

export function createComment(values, parentId, callback) {
  const {body, author} = values;

  const data = {
    id: guid(),
    parentId,
    timestamp: Date.now(),
    body,
    author,
  };

  return dispatch => {
    axios.post(`${url}/comments`, data).then(res => {
      callback();
      dispatch({type: CREATE_COMMENT, payload: res.data});
    });
  };
}

export function fetchCommentsCount(postId, callback) {
  return dispatch => {
    axios.get(`${url}/posts/${postId}/comments`).then(res => {
      const comments = _.filter(res.data, comment => !comment.deleted);
      const length = Object.keys(comments).length;
      const count = {postId, length};
      callback(count);
      dispatch({type: FETCH_COMMENTS_COUNT, payload: count});
    });
  };
}

export function fetchComment(id) {
  return dispatch => {
    axios
      .get(`${url}/comments/${id}`)
      .then(res => dispatch({type: FETCH_COMMENT, payload: res.data}));
  };
}

export function deleteComment(id, callback) {
  return dispatch => {
    axios.delete(`${url}/comments/${id}`).then(res => {
      callback();
      dispatch({type: DELETE_COMMENT, payload: res.id});
    });
  };
}

export function editComment(id, values, callback) {
  return dispatch => {
    axios.put(`${url}/comments/${id}`, values).then(res => {
      callback();
      dispatch({type: EDIT_COMMENT, payload: res.data});
    });
  };
}
