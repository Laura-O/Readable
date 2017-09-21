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
import {	
	votePost,
	fetchCommentsCount,
	deletePost,
} from '../actions/index';
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
		console.log(this.props)
	}

	render() {
		const {post, votePost} = this.props;
		console.log(this.props);
		return (
			<div className="postcard" key={post.id}>
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
				<Card>
					<CardBlock>
						<CardTitle>{post.title}</CardTitle>
						<CardText>
							{post.body}
							<a href={'posts/' + post.id}>
								<Button size="sm" color="link">
									Read more
								</Button>
							</a>
							<p className="text-muted">
								<small>
									Posted on {formatTimestamp(post.timestamp)} by {post.author}
								</small>
							</p>
							<p className="postButtons">
								<Link to={`posts/edit/${post.id}`}>
									<Button color="warning" size="sm">
										Edit
									</Button>
								</Link>
								<Link to={"/"}><Button size="sm" color="danger" onClick={() => this.deleteButtonPress(post.id)}>
									Delete
								</Button>
							</Link>
							</p>
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
