import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import CommentsReducer from './reducer_comments';
import CategoriesReducter from './reducer_categories';

const rootReducer = combineReducers({
    posts: PostsReducer,
    comments: CommentsReducer,
    categories: CategoriesReducter,
});

export default rootReducer;