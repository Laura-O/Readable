import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';

class Post extends Component {
	render() {
		const {post} = this.props;
		console.log(post);
		return (
			<div className="card">
				<div className="card-body">
					<h2 className="card-title">{post.title}</h2>
					<p className="card-text">{post.body}</p>
					Posted on {post.timestamp} by {post.author}
				</div>
			</div>
		);
	}
}

export default Post;
