import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PostsList from './PostsList';
import CategoriesList from './CategoriesList';

class PostsMain extends Component {
	render() {
		return (
			<div className="row d-flex justify-content-between">
				<div className="col-8">					
					<PostsList {...this.props} />
				</div>
				<div className="col-4">
					<CategoriesList />
					<Link to="posts/new">Create Post</Link>
				</div>
			</div>
		);
	}
}

export default PostsMain;
