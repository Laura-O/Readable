import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {Button, Form, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {createPost, fetchCategories} from '../actions';

class PostsCreate extends Component {
	componentWillMount() {
		this.props.fetchCategories();
	}

	renderField(field) {
		const {meta: {touched, error}} = field;
		const className = touched && error ? 'has-danger' : null;

		return (
			<Form>
				<div className={'form-group ' + className}>
					<label>{field.label}</label>
					<input type="text" {...field.input} />
					<div className="form-control-feedback">{touched ? error : ''}</div>
				</div>
			</Form>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const {handleSubmit, categories} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field label="Title" name="title" component={this.renderField} />
				<Field label="Content" name="body" component={this.renderField} />
				<Field label="Author" name="author" component={this.renderField} />
				<Input type="select" name="category" component="select">
					{categories.map(category => (
						<option key={category.name} value={category.name}>
							{category.name}
						</option>
					))}
				</Input>
				<br />
				<Button type="submit" bsStyle="primary">
					Submit
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
	return {categories: state.categories.all};
}

export default reduxForm({
	validate,
	form: 'CreatePostForm',
})(
	connect(mapStateToProps, {
		createPost,
		fetchCategories,
	})(PostsCreate)
);
