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
					<li key={category.path} className="list-group-item text-capitalize">
						<a href={'/' + category.name}>{category.name}</a>
					</li>
				);
			});
		}
		return <div>Fetching categories</div>;
	}

	render() {
		return (
			<div>
				<h2>Categories</h2>
				<ul className="list-group">{this.renderCategories()}</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {categories: state.categories.all};
}

export default connect(mapStateToProps, {fetchCategories})(CategoriesList);
