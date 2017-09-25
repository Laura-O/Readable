import axios from 'axios';
import {
  FETCH_CATEGORIES,
} from './types';
import {url, authHeader} from './constants';

axios.defaults.headers.common['Authorization'] = authHeader;

export function fetchCategories() {
  return dispatch => {
    axios
      .get(`${url}/categories`)
      .then(res => dispatch({type: FETCH_CATEGORIES, payload: res.data}));
  };
}
