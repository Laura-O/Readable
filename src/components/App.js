import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Grid} from 'react-bootstrap';
import PostsMain from './PostsMain';
import PostsDetail from './PostsDetail';
import PostsCreate from './PostsCreate';
import PostsEdit from './PostsEdit';
import NavbarTop from './NavbarTop';

class App extends Component {
	render() {
		return (
			<div>
				<NavbarTop />
				<Grid>
					<Switch>
						<Route path="/" exact component={PostsMain} />
						<Route path="/posts/new" component={PostsCreate} />
						<Route
							path="/posts/edit/:id"
							children={props => <PostsEdit {...props} />}
						/>
						<Route path="/posts/:id" component={PostsDetail} />
					</Switch>
				</Grid>
			</div>
		);
	}
}

export default App;
