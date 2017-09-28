import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
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
				<div className={'form-group ' + className}>
					<label>{field.label}</label>
					<input type="text" {...field.input} />
					<div className="form-control-feedback">{touched ? error : ''}</div>
				</div>			
		);
	}

	renderCategoryField(field) {
		const {categories} = this.props;
		const {meta: {touched, error}} = field;
		const className = touched && error ? 'error' : null;
		
		return (
			<div className={'form-group ' + className}>
				<label>{field.label}</label>
				<select {...field.input} className="form-control text-capitalize">
					<option value="" className="disabled">
						Select Category
					</option>
					{categories.map(category => (
						<option key={category.name} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
				<div className="form-control-feedback">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		console.log(values);
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const {handleSubmit} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field label="Title" name="title" component={this.renderField} />
				<Field label="Content" name="body" component={this.renderField} />
				<Field label="Author" name="author" component={this.renderField} />
				<Field
					label="Category"
					name="category"
					component={field => this.renderCategoryField(field)}
				>
				</Field>
				<br />
				<Button type="submit" color="primary">
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
