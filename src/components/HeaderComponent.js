import React, {Component} from 'react';
import {Navbar, Nav, Container, NavbarBrand, NavLink, NavbarToggler, NavItem, Collapse} from 'reactstrap';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({isNavOpen: !this.state.isNavOpen});
    }

    render() {
        return (
            <div>
                <Navbar color="primary" dark expand="md">
                    <NavbarBrand href='/todolists'>To DO LIST</NavbarBrand>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/todolists">My Lists</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/profile">Profile</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Header;