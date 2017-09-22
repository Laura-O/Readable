import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import PostsReducer from './reducer_posts';
import CategoriesReducer from './reducer_categories';
import CommentsReducer from './reducer_comments';
import PostsOrderReducer from './reducer_sorting';

const rootReducer = combineReducers({
	posts: PostsReducer,
	categories: CategoriesReducer,
	form: formReducer,
	comments: CommentsReducer,
	postsOrder: PostsOrderReducer,
});

export default rootReducer;
