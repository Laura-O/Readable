import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PostList from './PostList';
import PostComplete from './PostComplete';
import PostCreate from './PostCreate';
import CategoriesList from './CategoriesList';
import {Route, Switch} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';

class App extends Component {
	componentDidMount() {}

	render() {
		return (
			<Grid>
				<Row>
				<Col md={8}>
				<Switch>
					<Route path="/" exact component={PostList} />
					<Route path="/posts/:id" component={PostComplete} />
					<Route path="/create" component={PostCreate} />
				</Switch>
				</Col>
				<Col xs={3} xsOffset={1}>
					<CategoriesList />
					<Link to="/create">Create Post</Link>
				</Col>
			</Row>
			</Grid>
		);
	}
}

export default App;
