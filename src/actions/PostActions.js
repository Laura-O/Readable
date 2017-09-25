import axios from 'axios';
import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  SORT_POSTS,
} from './types';
import {url, authHeader} from './constants';
import {guid} from './helper';

axios.defaults.headers.common['Authorization'] = authHeader;

export function fetchPosts() {
  return dispatch => {
    axios
      .get(`${url}/posts`)
      .then(res => dispatch({type: FETCH_POSTS, payload: res.data}));
  };
}

export function fetchPost(id) {
  return dispatch => {
    axios
      .get(`${url}/posts/${id}`)
      .then(res => dispatch({type: FETCH_POST, payload: res.data}));
  };
}

export function fetchCategoryPosts(category) {
  return dispatch => {
    axios
      .get(`${url}/${category}/posts`)
      .then(res => dispatch({type: FETCH_POSTS, payload: res.data}));
  };
}

export function createPost(values, callback) {
  const {title, body, author, category} = values;

  const data = {
    id: guid(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category,
  };

  return dispatch => {
    axios.post(`${url}/posts`, data).then(res => {
      callback();
      dispatch({type: CREATE_POST, payload: res.data});
    });
  };
}

export function editPost(id, values, callback) {
  return dispatch => {
    axios.put(`${url}/posts/${id}`, values).then(res => {
      callback();
      dispatch({type: EDIT_POST, payload: res.data});
    });
  };
}

export function deletePost(id, callback) {
  return dispatch => {
    axios.delete(`${url}/posts/${id}`).then(res => {
      callback();
      dispatch({type: DELETE_POST, payload: id});
    });
  };
}

export function votePost(id, vote) {
  return dispatch => {
    axios
      .post(`${url}/posts/${id}`, {option: vote})
      .then(res => dispatch({type: VOTE_POST, payload: res.data}));
  };
}

export function sortPosts(sortType) {
  return {
    type: SORT_POSTS,
    payload: sortType,
  };
}
