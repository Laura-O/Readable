import React, {Component} from 'react';
import PostList from './PostList';
import PostComplete from './PostComplete';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
	componentDidMount() {}

	render() {
		return (
			<div>
				<Switch>
					<Route path="/" exact component={PostList} />
					<Route path="/posts/:id" component={PostComplete} />
				</Switch>
			</div>
		);
	}
}

export default App;
