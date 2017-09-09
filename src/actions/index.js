export const FETCH_POSTS = 'fetch_posts';

const url = 'http://localhost:3001';

export function fetchPosts() {
	const request = fetch(`${url}/posts`, {
		headers: {Authorization: 'whatever-you-want'},
	});

	return dispatch => {
		request
			.then(res => res.json())
			.then(data => dispatch(fetchPostsSuccess(data)));
	};
}

function fetchPostsSuccess(data) {
	return {
		type: FETCH_POSTS,
		payload: data,
	};
}
