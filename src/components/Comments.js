import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPostComments} from '../actions/index';

class Comments extends Component {
	componentWillMount() {
		const {fetchPostComments, postId} = this.props;
		fetchPostComments(postId);
	}

	render() {
		const {comments} = this.props;
		return (
			<div>
				{comments.map(comment => {
					return (
						<div className="card" key={comment.id}>
							<div className="card-block">
								<div className="card-text">
									{comment.body}
								</div>
								<a href="#" className="card-link">
									Edit
								</a>
								<a href="#" className="card-link">
									Delete
								</a>
							</div>
						</div>
					);
				})}
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
})(Comments);
