import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCategories} from '../actions';

class CategoriesList extends Component {
	componentWillMount() {
		this.props.fetchCategories();
	}

	renderCategories() {
		const {categories} = this.props;
		if (categories) {
			return categories.map(category => {
				return (
					<p key={category.path}>
						{category.name}
					</p>
				);
			});
		}
		return <div>Fetching categories</div>;
	}

	render() {
		return (
			<div>
				<h2>Categories</h2>
				{this.renderCategories()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {categories: state.categories.all};
}

export default connect(mapStateToProps, {fetchCategories})(CategoriesList);
