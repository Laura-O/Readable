import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {fetchPosts} from '../actions/index';

class PostsList extends Component {
	componentWillMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		return this.props.posts.map(post => {
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
							<Link to={`/posts/edit/${post.id}`}>
								<Button bsStyle="warning" bsSize="xsmall">
									Edit Post
								</Button>
							</Link>
						</p>
					</div>
				</div>
			);
		});
	}

	render() {
		console.log(this.props.posts);
		return (
			<div>
				{this.renderPosts()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {posts: state.posts.all.filter(post => !post.deleted)};
}

export default connect(mapStateToProps, {fetchPosts})(PostsList);
