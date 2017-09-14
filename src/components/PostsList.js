import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts, fetchCategoryPosts, votePost} from '../actions/index';
import PostsListSingle from './PostsListSingle';

class PostsList extends Component {
	componentWillMount() {
		if (this.props.match.params.category) {
			this.props.fetchCategoryPosts(this.props.match.params.category);
		} else {
			this.props.fetchPosts();
		}
	}

	renderPosts() {
		const {votePost, fetchPosts, posts} = this.props;
		if (posts) {
			return _.map(posts, post => (
				<PostsListSingle key={post.id} post={post} />
			));
		}
	}

	render() {
		return <div>{this.renderPosts()}</div>;
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
