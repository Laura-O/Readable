import axios from 'axios';
import _ from 'lodash';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const FETCH_POST_COMMENTS = 'fetch_post_comments';
export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_CATEGORY_POST = 'fetch_category_posts';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const DELETE_POST = 'delete_post';
export const VOTE_POST = 'vote_post';
export const CREATE_COMMENT = 'create_comment';
export const EDIT_COMMENT = 'edit_comment';
export const DELETE_COMMENT = 'delete_comment';
export const FETCH_COMMENTS_COUNT = 'fetch_comments_count';
export const FETCH_COMMENT = 'fetch_comment';
export const VOTE_COMMENT = 'vote_comment';
export const SORT_POSTS = 'sort_posts';

const url = 'http://localhost:3001';
const authHeader = {headers: {Authorization: 'whatever-you-want'}};

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

export function voteComment(id, vote) {
	return dispatch => {
		axios
			.post(`${url}/comments/${id}`, {option: vote})
			.then(res => dispatch({type: VOTE_COMMENT, payload: res.data}));
	};
}

export function fetchCategories() {
	return dispatch => {
		axios
			.get(`${url}/categories`)
			.then(res => dispatch({type: FETCH_CATEGORIES, payload: res.data}));
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

export function sortPosts(sortType) {
	return {
		type: SORT_POSTS,
		payload: sortType,
	};
}

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return (
		s4() +
		s4() +
		'-' +
		s4() +
		'-' +
		s4() +
		'-' +
		s4() +
		'-' +
		s4() +
		s4() +
		s4()
	);
}
