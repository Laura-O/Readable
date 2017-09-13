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
						<Route exact path="/" exact component={PostsMain} />
						<Route exact path="/posts/new" component={PostsCreate} />
						<Route exact path="/posts/edit/:id" children={props => <PostsEdit {...props} />}/>
						<Route exact path="/posts/:id" component={PostsDetail} />
					</Switch>
				</Grid>
			</div>
		);
	}
}

export default App;
