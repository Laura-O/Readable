import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const FETCH_POST_COMMENTS = 'fetch_post_comments';
export const FETCH_CATEGORIES = 'fetch_categories';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const DELETE_POST = 'delete_post';

const url = 'http://localhost:3001';
const authHeader = {headers: {Authorization: 'whatever-you-want'}};

axios.defaults.headers.common['Authorization'] = authHeader;

export function fetchPosts() {
	return dispatch => {
		axios
			.get(`${url}/posts`)
			.then(res => dispatch(fetchPostsSuccess(res.data)));
	};
}

export function fetchPost(id) {
	return dispatch => {
		axios
			.get(`${url}/posts/${id}`)
			.then(res => dispatch(fetchPostSuccess(res.data)));
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
			dispatch(createPostSuccess(res.data));
		});
	};
}

export function editPost(id, values, callback) {
	return dispatch => {
		axios.put(`${url}/posts/${id}`, values).then(res => {
			callback();
			dispatch(editPostSuccess(res.data));
		});
	};
}

export function deletePost(id, callback) {
	return dispatch => {
		axios.delete(`${url}/posts/${id}`).then(res => {
			callback();
			dispatch(deletePostSuccess(id));
		});
	};
}

export function fetchCategories() {
	return dispatch => {
		axios
			.get(`${url}/categories`)
			.then(res => dispatch(fetchCategoriesSuccess(res.data)));
	};
}

export function fetchPostComments(postId) {
	return dispatch => {
		axios.get(`${url}/posts/${postId}/comments`).then(res => {
			dispatch({type: FETCH_POST_COMMENTS, payload: res.data});
		});
	};
}

function fetchPostsSuccess(data) {
	return {
		type: FETCH_POSTS,
		payload: data,
	};
}

function fetchPostSuccess(data) {
	return {
		type: FETCH_POST,
		payload: data,
	};
}

// function fetchPostCommentsSuccess(data) {
// 	return {
// 		type: FETCH_POST_COMMENTS,
// 		payload: data,
// 	};
// }

function fetchCategoriesSuccess(data) {
	return {
		type: FETCH_CATEGORIES,
		payload: data,
	};
}

function createPostSuccess(data) {
	return {
		type: CREATE_POST,
		payload: data,
	};
}

function editPostSuccess(data) {
	return {
		type: EDIT_POST,
		payload: data,
	};
}

function deletePostSuccess(data) {
	return {
		type: DELETE_POST,
		payload: data,
	};
}

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
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
