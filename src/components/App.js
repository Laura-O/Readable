import React, {Component} from 'react';
import PostList from './PostList';
import {Grid} from 'react-bootstrap';

class App extends Component {
	componentDidMount() {}

	render() {
		return (
			<Grid>
				<PostList />
			</Grid>
		);
	}
}

export default App;
