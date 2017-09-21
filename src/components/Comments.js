import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from 'reactstrap';
import Fontawesome from 'react-fontawesome';
import {fetchPostComments, deleteComment, voteComment} from '../actions/index';

class Comments extends Component {
	componentWillMount() {
		const {fetchPostComments, postId} = this.props;
		fetchPostComments(postId);
	}

	deleteButton(id) {
		const {deleteComment, fetchPostComments, postId} = this.props;

		deleteComment(id, () => {
			fetchPostComments(postId);
		});
	}

	renderComments() {
		const {voteComment, comments} = this.props;
		console.log(comments);
		if (comments) {
			return _.map(comments, (comment, id) => {
				return (
					<div
						className="card card-outline-info mb-3 text-center d-flex flex-row"
						key={id}
					>
						<div className="voting p-2">
							<span>
								<Fontawesome
									name="arrow-up"
									onClick={() => {
										voteComment(comment.id, 'upVote');
									}}
								/>
								<div className="vote-score">{comment.voteScore}</div>
								<Fontawesome
									name="arrow-down"
									onClick={() => {
										voteComment(comment.id, 'downVote');
									}}
								/>
							</span>
						</div>
						<div className="card-text p-2 align-self-md-center">
							{comment.body}
						</div>
						<div className="ml-auto p-4">
							<ButtonGroup>
								<Button size="sm" color="warning">
									Edit Post
								</Button>
								<Button
									size="sm"
									color="danger"
									onClick={() => this.deleteButton(comment.id)}
								>
									Delete Post
								</Button>
							</ButtonGroup>
						</div>
					</div>
				);
			});
		}
		return <div>Loading</div>;
	}

	render() {
		return <div>{this.renderComments()}</div>;
	}
}

function mapStateToProps(state) {
	const comments = _.filter(state.comments, comment => !comment.deleted);
	return {comments};
}

export default connect(mapStateToProps, {
	fetchPostComments,
	deleteComment,
	voteComment,
})(Comments);
