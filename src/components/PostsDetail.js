import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  CardBlock,
  CardTitle,
} from 'reactstrap';
import Fontawesome from 'react-fontawesome';
import {fetchPost, fetchPostComments, fetchCommentsCount, votePost, deletePost} from '../actions';
import Comments from './Comments';
import NotFound from './NotFound';

class PostsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  componentWillMount() {
    this.props.fetchPost(this.props.match.params.id);
    this.props.fetchPostComments(this.props.match.params.id);
    this.props.fetchCommentsCount(this.props.match.params.id, data => {
      this.setState({count: data.length});
    });
  }

  deleteButtonPress() {
    this.props.deletePost(this.props.match.params.id, () => {
      this.props.history.push('/');
    });
  }

  render() {    
    const {post, votePost} = this.props;
    return !post
      ? <NotFound />
      : <div>
          <div className="voting">
            <span>
              <Fontawesome
                name="arrow-up"
                onClick={() => {
                  votePost(post.id, 'upVote');
                }}
              />
              <div className="vote-score">
                {post.voteScore}
              </div>
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
              <CardTitle>
                {post.title}
              </CardTitle>
              <div>
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
              </div>
            </CardBlock>
            <CardFooter className="d-flex justify-content-between">
              <span>
                <Badge>
                  {post.category}
                </Badge>
              </span>
              <span>
                <Badge>                  
                  {this.props.comments.length} Comment
                </Badge>
              </span>
              <span>
                Posted by {post.author}
              </span>
            </CardFooter>
          </Card>
          <div className="d-flex flex-row-reverse commentSection">
            <Link to={`/${post.category}/${post.id}/comments/new`}>
              <Button size="sm" color="primary">
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
        </div>;
  }
}

function mapStateToProps(state, ownProps) {
  const comments = _.filter(state.comments, comment => !comment.deleted);
  return {post: state.posts[ownProps.match.params.id],
    comments};
}

export default connect(mapStateToProps, {
  fetchPost,
  fetchPostComments,
  fetchCommentsCount,
  deletePost,
  votePost,
})(PostsDetail);
