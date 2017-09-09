import React, {Component} from 'react';

class Post extends Component {
	render() {
		const {post} = this.props;
		console.log(post);
		return <div />;
	}
}

export default Post;
