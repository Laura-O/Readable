import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
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
				console.log(comment);
				return (
					<div className="card" key={comment.id}>
						<div className="card-block">
							<div className="card-text">
								{comment.body}
							</div>
							<a href="" className="card-link">
								Edit
							</a>
							<Button onClick={() => this.deleteButton(comment.id)}>
								Delete
							</Button>
						</div>
					</div>
				);
			});
		}
		return <div>Loading</div>;
	}

	render() {
		return (
			<div>
				{this.renderComments()}
			</div>
		);
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
