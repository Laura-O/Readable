export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';

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
