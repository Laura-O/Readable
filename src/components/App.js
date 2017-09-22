import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import PostsMain from './PostsMain';
import PostsDetail from './PostsDetail';
import PostsCreate from './PostsCreate';
import PostsEdit from './PostsEdit';
import NavbarTop from './NavbarTop';
import CommentsCreate from './CommentsCreate';
import CommentsEdit from './CommentsEdit';

class App extends Component {
	render() {
		return (
			<div>
				<NavbarTop />
				<div className="container">
					<Switch>
						<Route exact path="/" component={PostsMain} />
						<Route
							path="/:category"
							exact
							component={props => <PostsMain {...props} />}
						/>
						<Route exact path="/posts/new" component={PostsCreate} />
						<Route
							exact
							path="/posts/edit/:id"
							children={props => <PostsEdit {...props} />}
						/>
						<Route exact path="/posts/:id" component={PostsDetail} />
						<Route
							path="/:category/:id/comments/new"
							component={CommentsCreate}
						/>
						<Route
							exact
							path="/posts/:postId/comments/edit/:id"
							children={props => <CommentsEdit {...props} />}
						/>
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
