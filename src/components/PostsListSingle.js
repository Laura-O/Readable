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
import {fetchPosts, fetchCategoryPosts, votePost} from '../actions/index';
import formatTimestamp from '../utils/formatTimestamp';
import Fontawesome from 'react-fontawesome';

class PostsListSingle extends Component {
	render() {
		const {post} = this.props;
		return (
			<div className="postcard" key={post.id}>
				<div className="voting">
					<span>
						<Fontawesome
							name="arrow-up"
							onClick={() => {
								votePost(post.id, 'upVote');
								fetchPosts();
							}}
						/>
						<div className="vote-score">{post.voteScore}</div>

						<Fontawesome
							name="arrow-down"
							onClick={() => {
								votePost(post.id, 'downVote');
								fetchPosts();
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
						</span>
					</CardFooter>
				</Card>
			</div>
		);
	}
}
export default PostsListSingle;
