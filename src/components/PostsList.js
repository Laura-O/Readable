import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {fetchPosts, fetchCategoryPosts, votePost} from '../actions/index';
import formatTimestamp from '../utils/formatTimestamp';

class PostsList extends Component {
	componentWillMount() {
		if (this.props.match.params.category) {
			this.props.fetchCategoryPosts(this.props.match.params.category);
		} else {
			this.props.fetchPosts();
		}
	}

	renderPosts() {
		const {votePost, fetchPosts} = this.props;
		return this.props.posts.map(post => {
			return (
				<div className="media" key={post.id}>
					<div className="media-vote">
						<span>
							<Button
								onClick={() => {
									votePost(post.id, 'upVote');
									fetchPosts();
								}}
								className="btn btn-score"
							>
								<span
									className="glyphicon glyphicon-triangle-top"
									aria-hidden="true"
								/>
							</Button>
							<div className="vote-score">
								{post.voteScore}
							</div>
							<Button
								onClick={() => {
									votePost(post.id, 'downVote');
									fetchPosts();
								}}
								className="btn btn-score"
							>
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
								Posted on {formatTimestamp(post.timestamp)} by {post.author} in {post.category}
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

export default connect(mapStateToProps, {
	fetchPosts,
	fetchCategoryPosts,
	votePost,
})(PostsList);
