import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {fetchPost, deletePost} from '../actions';

class PostsDetail extends Component {
	componentWillMount() {
		this.props.fetchPost(this.props.match.params.id);
	}

	deleteButtonPress() {
		this.props.deletePost(this.props.match.params.id, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const {post} = this.props;
		if (!post) {
			return <div>Loading...</div>;
		}
		return (
			<div>
			<div className="media">
				<h2>
					{post.title}
				</h2>
				<Button bsSize="xsmall">
					{post.category}
				</Button>
				<p>
					{post.body}
				</p>
				<Link to="/">
					<Button>Back</Button>
				</Link>
				<Link to={`/posts/edit/${post.id}`}>
					<Button bsStyle="warning">Edit Post</Button>
				</Link>
				<Button bsStyle="danger" onClick={this.deleteButtonPress.bind(this)}>
					Delete Post
				</Button>
			</div>			
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {post: state.posts.post};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsDetail);
