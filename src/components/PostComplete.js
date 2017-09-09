import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost} from '../actions/index';
import PostEntry from './PostEntry';

class PostComplete extends Component {
	componentWillMount() {
		console.log(this.props);
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
				<Link to="/">View all</Link>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {post: state.posts.post};
}

export default connect(mapStateToProps, {fetchPost})(PostComplete);
