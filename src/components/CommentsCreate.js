import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {Form, FormGroup, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {createComment} from '../actions';

class CommentsCreate extends Component {
	renderField(field) {
		const {meta: {touched, error}} = field;
		const className = touched && error ? 'error' : null;

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
		const id = this.props.match.params.id;
		this.props.createComment(values, id, () => {
			this.props.history.push(`/posts/${id}`);
		});
	}

	render() {
		const {handleSubmit, match: {params: {id}}} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field label="Comment" name="body" component={this.renderField} />
				<Field label="Author" name="author" component={this.renderField} />
				<Button type="submit" size="sm">
					Submit
				</Button>
				<Link to={`/posts/${id}`} className="btn btn-danger btn-sm">
					Cancel
				</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	if (!values.author) {
		errors.author = 'Name missing';
	}
	if (!values.body) {
		errors.body = 'Comment missing';
	}
	return errors;
}

export default reduxForm({
	validate,
	form: 'CreateCommentForm',
})(
	connect(null, {
		createComment,
	})(CommentsCreate)
);
