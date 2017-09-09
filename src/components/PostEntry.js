import React, {Component} from 'react';

class PostEntry extends Component {
	render() {
		const {post} = this.props;
		console.log(post);
		return (
			<div className="card">
				<div className="card-body">
					<h2 className="card-title">
						{post.title}
					</h2>
					<p className="card-text">
						{post.body}
					</p>
					<p className="card-text">
						<small className="text-muted">
							Posted on {post.timestamp} by {post.author}
						</small>
					</p>
					<a href={'posts/' + post.id}>View</a>
				</div>
			</div>
		);
	}
}

export default PostEntry;
