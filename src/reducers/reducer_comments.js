import _ from 'lodash';
import  {
    FETCH_POST_COMMENTS,
		CREATE_COMMENT,
} from '../actions';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POST_COMMENTS:
            return _.mapKeys(action.payload, 'id');			
        default:
            return state;
    }
}