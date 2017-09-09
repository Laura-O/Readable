import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

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
							Posted on {post.timestamp} by {post.author} in {post.category}
						</small>
					</p>					
				</div>
        <div className="card-footer">
          <Button>{post.voteScore}</Button>
          <a href={'posts/' + post.id}>View</a>
        </div>
			</div>
		);
	}
}

export default PostEntry;
