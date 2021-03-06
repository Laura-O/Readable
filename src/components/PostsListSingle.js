import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
	Badge,
	Button,
	Card,
	CardText,
	CardBlock,
	CardTitle,
	CardFooter,
} from 'reactstrap';
import {votePost, fetchCommentsCount, deletePost} from '../actions/index';
import formatTimestamp from '../utils/formatTimestamp';
import Fontawesome from 'react-fontawesome';

class PostsListSingle extends Component {
	constructor(props) {
		super(props);
		this.state = {count: 0};
	}

	componentWillMount() {
		this.props.fetchCommentsCount(this.props.post.id, data => {
			this.setState({count: data.length});
		});
	}

	deleteButtonPress(id) {
		this.props.deletePost(id, () => {});
	}

	render() {
		const {post, votePost} = this.props;
		return (
			<div className="postcard" key={post.id}>
				<div className="voting">
					<div>
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
					</div>
				</div>
				<Card>
					<CardBlock>
						<CardTitle><Link to={'posts/' + post.id}>{post.title}</Link></CardTitle>
						<CardText>
							{post.body}
							<a href={post.category + '/' + post.id}>
								<Button size="sm" color="link">
									Read more
								</Button>
							</a><br/>
							<span className="text-muted">
								<small>
									Posted on {formatTimestamp(post.timestamp)} by {post.author}
								</small>
							</span>
							<span className="postButtons">
								<Link to={`/${post.category}/edit/${post.id}`}>
									<Button color="warning" size="sm">
										Edit
									</Button>
								</Link>
								<Link to={'/'}>
									<Button
										size="sm"
										color="danger"
										onClick={() => this.deleteButtonPress(post.id)}
									>
										Delete
									</Button>
								</Link>
							</span>
						</CardText>
					</CardBlock>
					<CardFooter className="text-muted">
						<span>
							<Badge>{post.category}</Badge>
						</span>
						<span>
							<Badge color="info">{this.state.count} comments</Badge>
						</span>
					</CardFooter>
				</Card>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const {count} = state.comments;
	return {count};
}

export default connect(mapStateToProps, {
	fetchCommentsCount,
	deletePost,
	votePost,
})(PostsListSingle);
