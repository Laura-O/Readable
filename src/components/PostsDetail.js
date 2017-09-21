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
import Fontawesome from 'react-fontawesome';
import {fetchPost, votePost, deletePost} from '../actions';
import Comments from './Comments';

class PostsDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {count: 0};
	}

	componentWillMount() {
		this.props.fetchPost(this.props.match.params.id);
	}

	deleteButtonPress() {
		this.props.deletePost(this.props.match.params.id, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const {post, votePost} = this.props;
		if (!post) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<div className="voting">
					<span>
						<Fontawesome
							name="arrow-up"
							onClick={() => {
								votePost(post.id, 'upVote');
							}}
						/>
						<div className="vote-score">{post.voteScore}</div>
						<Fontawesome
							name="arrow-down"
							onClick={() => {
								votePost(post.id, 'downVote');
							}}
						/>
					</span>
				</div>
				<Card className="singlepost">
					<CardBlock>
						<CardTitle>{post.title}</CardTitle>
						<CardText>
							{post.body}

							<div className="d-flex flex-row-reverse">
								<ButtonGroup className="postButtons">
									<Link to={`/posts/edit/${post.id}`}>
										<Button size="sm" color="warning">
											Edit
										</Button>
									</Link>
									<Button
										size="sm"
										color="danger"
										onClick={this.deleteButtonPress.bind(this)}
									>
										Delete
									</Button>
								</ButtonGroup>
							</div>
						</CardText>
					</CardBlock>
					<CardFooter className="d-flex justify-content-between">
						<Button size="sm">{post.category}</Button>
						<span>Posted by {post.author}</span>
					</CardFooter>
				</Card>
				<div className="d-flex flex-row-reverse">
					<Link to={`/${post.category}/${post.id}/comments/new`}>
						<Button bsSize="xsmall" color="primary">
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

export default connect(mapStateToProps, {fetchPost, deletePost, votePost})(
	PostsDetail
);
