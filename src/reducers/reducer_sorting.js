import {SORT_POSTS} from '../actions/types';

const INITIAL_STATE = 'votescore';

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SORT_POSTS:
			return action.payload;
		default:
			return state;
	}
}
