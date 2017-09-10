export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const FETCH_POST_COMMENTS = 'fetch_post_comments';
export const FETCH_CATEGORIES = 'fetch_categories';

const url = 'http://localhost:3001';
const authHeader = {headers: {Authorization: 'whatever-you-want'}};

export function fetchPosts() {
	const request = fetch(`${url}/posts`, authHeader);
	return dispatch => {
		request
			.then(res => res.json())
			.then(data => dispatch(fetchPostsSuccess(data)));
	};
}

export function fetchPost(id) {
	const request = fetch(`${url}/posts/${id}`, authHeader);
	return dispatch => {
		request
			.then(res => res.json())
			.then(data => dispatch(fetchPostSuccess(data)));
	};
}

export function fetchPostComments(id) {
	const request = fetch(`${url}/posts/${id}/comments`, authHeader);
	return dispatch => {
		request
			.then(res => res.json())
			.then(data => dispatch(fetchPostCommentsSuccess(data)));
	};
}

export function fetchCategories() {
	const request = fetch(`${url}/categories`, authHeader);
	return dispatch => {
		request
			.then(res => res.json())
			.then(data => dispatch(fetchCategoriesSuccess(data)));
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

function fetchPostCommentsSuccess(data) {
	return {
		type: FETCH_POST_COMMENTS,
		payload: data,
	};
}

function fetchCategoriesSuccess(data) {
	return {
		type: FETCH_CATEGORIES,
		payload: data,
	};
}
