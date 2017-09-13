import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import PostsList from './PostsList';
import CategoriesList from './CategoriesList';

class PostsMain extends Component {
	render() {
		return (
			<Row>
				<Col md={8}>					
					<PostsList {...this.props} />
				</Col>
				<Col md={2} offset={2}>
					<CategoriesList />
					<Link to="posts/new">Create Post</Link>
				</Col>
			</Row>
		);
	}
}

export default PostsMain;
