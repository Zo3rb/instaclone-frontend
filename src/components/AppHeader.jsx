import React, { Fragment, useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';

import { connect } from 'react-redux';
import { logoff } from '../redux/actions';

const AppHeader = props => {

    // Creating Navigation Collapse State & Function
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // Getting Clone of Page History 
    const history = useHistory();

    // Helper Method for Rendering Header For Authenticated User
    const AUTH_HEADER = () => {
        return (
            <Navbar color="dark" dark expand="md">
                <Link to="/" className="logo-link">Instaclone</Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto app-header-items" navbar>
                        <NavItem>
                            <NavLink to="/new" activeClassName="active-link">
                                <i className="fas fa-plus"></i> Post
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/profile" activeClassName="active-link">
                                <i className="fas fa-user"></i> Profile
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <button className="btn btn-danger" onClick={() => props.logoff(() => history.push("/"))}>
                                logoff <i className="fas fa-sign-out-alt ml-1"></i>
                            </button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    };


    // Helper Method for Rendering Header For NONE Authenticated User
    const NONE_AUTH_HEADER = () => {
        return (
            <Navbar color="dark" dark expand="md">
                <Link to="/" className="logo-link">Instaclone</Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto app-header-items" navbar>
                        <NavItem>
                            <NavLink to="/login" activeClassName="active-link">
                                <i className="fas fa-sign-in-alt"></i> Login
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/reg" activeClassName="active-link">
                                <i className="fas fa-registered"></i> Sign Up
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }

    return (
        <Fragment>
            {props.authenticated ? AUTH_HEADER() : NONE_AUTH_HEADER()}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, { logoff })(AppHeader);
