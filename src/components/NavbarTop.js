import React from 'react';
import {
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';

const NavbarTop = () => {
	return (
		<div>
			<Navbar color="faded" light toggleable inverse>
				<NavbarToggler right onClick={this.toggle} />
				<NavbarBrand href="/">Readable</NavbarBrand>				
			</Navbar>
		</div>
	);
};

export default NavbarTop;
