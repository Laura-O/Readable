import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {
	FormGroup,
	FormControl,
	ControlLabel,
	HelpBlock,
	Button,
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostCreate extends Component {
	renderField(field) {
		const {meta: {touched, error}} = field;
		const className = touched && error ? 'error' : null;

		return (
			<FormGroup validationState={className}>
				<ControlLabel>
					{field.label}
				</ControlLabel>
				<FormControl type={field.type} {...field.input} />
				<HelpBlock>
					{touched ? error : ''}
				</HelpBlock>
			</FormGroup>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const {handleSubmit, reset} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field label="Title" name="title" component={this.renderField} />
				<Field label="Content" name="body" component={this.renderField} />
				<Field label="Author" name="author" component={this.renderField} />
				<Field label="Category" name="category" component={this.renderField} />
				<Button type="submit" bsStyle="primary">
					Create Post
				</Button>
				<Link to="/" className="btn btn-warning">
					Cancel
				</Link>
				<Button type="button" bsStyle="danger" onClick={reset}>
					Reset
				</Button>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	if (!values.title) {
		errors.title = 'Title missing';
	}
	if (!values.author) {
		errors.author = 'Author missing';
	}
	if (!values.body) {
		errors.body = 'Body missing';
	}
	if (!values.category) {
		errors.category = 'Category missing';
	}
	return errors;
}

function mapStateToProps(state) {
	const {categories, posts} = state;
	return {
		categories,
		posts,
	};
}

export default reduxForm({
	validate,
	form: 'PostCreateForm',
})(connect(mapStateToProps, {createPost})(PostCreate));
