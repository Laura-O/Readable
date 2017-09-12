import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const NavbarTop = () => {
	return (
		<Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Readable</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="/">Home</NavItem>
      <NavItem eventKey={2} href="/posts/new">New Post</NavItem>      
    </Nav>
  </Navbar>
	);
};

export default NavbarTop;
