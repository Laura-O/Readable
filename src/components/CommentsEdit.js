import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {Form, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {editComment, fetchComment} from '../actions/index';

class CommentsEdit extends Component {
	componentWillMount() {
		this.props.fetchComment(this.props.match.params.id);
	}

	componentDidMount() {
		this.handleInitialize();
	}

	handleInitialize() {
		if (this.props.comment) {
			const initData = {
				body: this.props.comment.body,
			};
			this.props.initialize(initData);
		}
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
		const {editComment, match: {params: {id}}, history} = this.props;

		editComment(id, values, () => {
			history.push('/');
		});
	}

	render() {		
		const {handleSubmit} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Content"
					name="body"
					value="bla"
					component={this.renderField}
				/>
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
	if (!values.body) {
		errors.body = 'Body missing';
	}
	return errors;
}

function mapStateToProps(state, ownProps) {
	return {comment: state.comments[ownProps.match.params.id]};
}

export default reduxForm({
	validate,
	form: 'editCommentForm',
})(connect(mapStateToProps, {editComment, fetchComment})(CommentsEdit));
