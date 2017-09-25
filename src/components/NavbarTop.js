import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  Nav,
  NavLink,
} from 'reactstrap';
import {fetchCategories} from '../actions';

class NavbarTop extends Component {
	componentWillMount() {
		this.props.fetchCategories();
	}

	renderCategories() {
		const {categories} = this.props;
		if (categories) {
			return categories.map(category => (
				<NavItem key={category.path}>
					<NavLink key={category.path} className="text-capitalize" href={'/' + category.name}>{category.name}</NavLink>
				</NavItem>
			));
		}
	}

  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable inverse>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Readable</NavbarBrand>
          <Nav className="ml-auto" navbar>
						{this.renderCategories()}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {categories: state.categories.all};
}

export default connect(mapStateToProps, {fetchCategories})(NavbarTop);
