import _ from 'lodash';
import {FETCH_POST_COMMENTS, DELETE_COMMENT} from '../actions';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_POST_COMMENTS:
			return _.mapKeys(action.payload, 'id');
		case DELETE_COMMENT:
			return _.omit(state, action.payload);
		default:
			return state;
	}
}
