import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import PostEntry from './PostEntry';

class PostList extends Component {
	componentWillMount() {
		this.props.fetchPosts();
	}

	render() {
		return (
			<div>
				{this.props.posts.map(post => <PostEntry key={post.id} post={post} />)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {posts: state.posts.all};
}

export default connect(mapStateToProps, {fetchPosts})(PostList);
