import _ from 'lodash';
import {
	FETCH_POST_COMMENTS,
	DELETE_COMMENT,
	FETCH_COMMENTS_COUNT,
	VOTE_COMMENT,
	FETCH_COMMENT,
} from '../actions';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_POST_COMMENTS:
			return _.mapKeys(action.payload, 'id');
		case DELETE_COMMENT:
			return _.omit(state, action.payload);
		case FETCH_COMMENTS_COUNT:
			return {
				...state,
				count: action.payload,
			};
		case VOTE_COMMENT:
			return {
				...state,
				[action.payload.id]: action.payload,
			};
		case FETCH_COMMENT:
			return {
				...state,
				[action.payload.id]: action.payload,
			};
		default:
			return state;
	}
}
