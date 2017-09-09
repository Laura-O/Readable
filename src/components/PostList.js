import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import Post from './Post'

class PostList extends Component {
	componentWillMount() {
		this.props.fetchPosts();
	}

	render() {
		console.log(this.props);
		return (
			<div>
        {this.props.posts.map(post => <Post key={post.id} post={post} />)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {posts: state.posts.all};
}

export default connect(mapStateToProps, {fetchPosts})(PostList);
