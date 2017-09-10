import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import CommentsReducer from './reducer_comments';
import CategoriesReducter from './reducer_categories';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    posts: PostsReducer,
    comments: CommentsReducer,
    categories: CategoriesReducter,
    form: formReducer,
});

export default rootReducer;