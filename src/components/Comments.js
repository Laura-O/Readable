import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from 'reactstrap';
import {fetchPostComments, deleteComment} from '../actions/index';

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
		const {comments} = this.props;
		if (comments) {
			return _.map(comments, comment => {
				return (
					<div className="card card-outline-info mb-3 text-center"
						key={comment.id}>
						<div className="card-text">
							{comment.body}
							<div className="d-flex flex-row-reverse">
								<ButtonGroup className="postButtons">
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
})(Comments);
