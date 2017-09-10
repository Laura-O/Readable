import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost} from '../actions/index';
import PostEntry from './PostEntry';
import Comments from './Comments';

class PostComplete extends Component {
	componentWillMount() {
		this.props.fetchPost(this.props.match.params.id);
	}

	render() {
		const {post} = this.props;
		if (!post) {
			return <div>Connecting</div>;
		}
		return (
			<div>
				<PostEntry key={post.id} post={post} />
        <Comments postId={post.id} />
				<Link to="/">View all</Link>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {post: state.posts.post};
}

export default connect(mapStateToProps, {fetchPost})(PostComplete);
