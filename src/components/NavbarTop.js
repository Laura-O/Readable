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
			<Navbar color="faded" light toggleable>
				<NavbarToggler right onClick={this.toggle} />
				<NavbarBrand href="/">Readable</NavbarBrand>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink href="/">Categories</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavbarTop;
