import React, {Component} from 'react';
import PostList from './PostList';
import PostComplete from './PostComplete';
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
				</Switch>
				</Col>
				<Col xs={3} xsOffset={1}>
					<CategoriesList />
				</Col>
			</Row>
			</Grid>
		);
	}
}

export default App;
