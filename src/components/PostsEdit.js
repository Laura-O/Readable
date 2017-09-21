import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {Form, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {editPost, fetchPost} from '../actions/index';

class PostsEdit extends Component {
	componentWillMount() {
		this.props.fetchPost(this.props.match.params.id);
	}

	componentDidMount() {
		this.handleInitialize();
	}

	handleInitialize() {
		if (this.props.post) {
			const initData = {
				title: this.props.post.title,
				body: this.props.post.body,
			};
			this.props.initialize(initData);
		}		
	}

	renderField(field) {
		const {meta: {touched, error}} = field;
		const className = touched && error ? 'has-danger' : null;

		return (
			<Form>
				<div className={"form-group " + className}>
					<label>{field.label}</label>
					<input type="text" {...field.input} />
					<div className="form-control-feedback">{touched ? error : ''}</div>
				</div>
			</Form>
		);
	}

	onSubmit(values) {
		const {editPost, match: {params: {id}}, history} = this.props;

		editPost(id, values, () => {
			history.push('/');
		});
	}

	render() {
		const {handleSubmit} = this.props;
		console.log('post', this.state);
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field label="Title" name="title" component={this.renderField} />
				<Field label="Content" name="body" value="bla" component={this.renderField} />				
				<Button type="submit" color="primary">
					Update
				</Button>
				<Link to="/" className="btn btn-danger">
					Cancel
				</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	if (!values.title) {
		errors.title = 'Title missing';
	}	
	if (!values.body) {
		errors.body = 'Body missing';
	}	
	return errors;
}

function mapStateToProps(state, ownProps) {
	return {post: state.posts[ownProps.match.params.id]};
}

export default reduxForm({
	validate,
	form: 'EditPostForm',
})(connect(mapStateToProps, {editPost, fetchPost})(PostsEdit));
