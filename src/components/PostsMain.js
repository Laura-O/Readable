import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
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
					<p>
						<Link to="posts/new">
							<Button color="info">Create Post</Button>
						</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default PostsMain;
