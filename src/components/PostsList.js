import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	fetchPosts,
	fetchCategoryPosts,
	votePost,
	sortPosts,
} from '../actions/index';
import {ButtonGroup, Button} from 'reactstrap';
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
			const orderedPosts = _.sortBy(posts, this.props.postsOrder).reverse();
			return orderedPosts.map(post => (
				<PostsListSingle key={post.id} post={post} />
			));
		}
	}

	render() {
		const {sortPosts} = this.props;
		return (
			<div>
				<ButtonGroup>
					<Button value="score" onClick={event => sortPosts('voteScore')}>
						Score
					</Button>
					<Button value="date" onClick={event => sortPosts('timestamp')}>
						Date
					</Button>
				</ButtonGroup>
				<div>{this.renderPosts()}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const posts = _.filter(state.posts, post => !post.deleted);
	const {postsOrder} = state;
	return {posts, postsOrder};
}

export default connect(mapStateToProps, {
	fetchPosts,
	fetchCategoryPosts,
	votePost,
	sortPosts,
})(PostsList);
