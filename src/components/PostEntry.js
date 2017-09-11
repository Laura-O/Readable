import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class PostEntry extends Component {
	render() {
		const {post} = this.props;
		console.log(post);
		return (
			<div className="media">
				<div className="media-vote">
					<span>
						<Button className="btn btn-score">
							<span
								className="glyphicon glyphicon-triangle-top"
								aria-hidden="true"
							/>
						</Button>
						<div className="vote-score">
							{post.voteScore}
						</div>
						<Button className="btn btn-score">
							<span
								className="glyphicon glyphicon-triangle-bottom"
								aria-hidden="true"
							/>
						</Button>
					</span>
				</div>
				<div className="media-body">
					<h2 className="media-heading">
						{post.title}
					</h2>
					<div>
						{post.body}
					</div>
					<p>
						<Button bsSize="xsmall">
							{post.category}
						</Button>
						<span>
							Posted on {post.timestamp} by {post.author} in {post.category}
						</span>
						<span>
							<a href={'posts/' + post.id}>View</a>
						</span>
					</p>
					<p>
						<Button bsSize="xsmall">
							Edit
						</Button>
						<Button bsSize="xsmall">
							Delete
						</Button>
					</p>
				</div>
			</div>
		);
	}
}

export default PostEntry;
