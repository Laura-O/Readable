import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
	Button,
	ButtonGroup,
	Card,
	CardFooter,
	CardText,
	CardBlock,
	CardTitle,
} from 'reactstrap';
import {fetchPost, deletePost} from '../actions';
import Comments from './Comments';

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
				<Card>
					<CardBlock>
						<CardTitle>{post.title}</CardTitle>
						<CardText>
							{post.body}

							<ButtonGroup className="postButtons">
								<Link to={`/posts/edit/${post.id}`}>
									<Button size="sm" color="warning">
										Edit Post
									</Button>
								</Link>
								<Button
									size="sm"
									color="danger"
									onClick={this.deleteButtonPress.bind(this)}
								>
									Delete Post
								</Button>
							</ButtonGroup>
						</CardText>
					</CardBlock>
					<CardFooter className="d-flex justify-content-between">
						<Button size="sm">{post.category}</Button>
						<span>Posted by {post.author}</span>
					</CardFooter>
				</Card>
				<div>
					<Link to={`/${post.category}/${post.id}/comments/new`}>
						<Button bsSize="xsmall" bsStyle="primary">
							Add comment
						</Button>
					</Link>
				</div>
				<Comments postId={post.id} />
				<div className="back">
					<Link to="/">
						<Button color="link">Back</Button>
					</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {post: state.posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsDetail);
