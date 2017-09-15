import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	Button,
	Card,
	CardText,
	CardBlock,
	CardTitle,
	CardFooter,
} from 'reactstrap';
import {
	fetchPosts,
	fetchCategoryPosts,
	votePost,
	fetchCommentsCount,
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
						</CardText>
					</CardBlock>
					<CardFooter>
						<Button size="sm">{post.category}</Button>
						<span>
							Posted on {formatTimestamp(post.timestamp)} by {post.author}
							{this.state.count ? this.state.count : 0} comments
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
	votePost,
})(PostsListSingle);
