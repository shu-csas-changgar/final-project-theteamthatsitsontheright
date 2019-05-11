import React, { Component , Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            loggedIn: null
        };
    }

    userHasAuthenticated = (authenticated) => {
        this.setState({ isAuthenticated: authenticated });
    };

    loginUser = (user) => {
        this.setState({ loggedIn : user });
    };

    handleLogout = (event) => {
        this.userHasAuthenticated(false);
        this.setState({ loggedIn: null });
    };

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            loggedIn: this.state.loggedIn,
            userHasAuthenticated: this.userHasAuthenticated,
            loginUser: this.loginUser
        };

        return (
            <div className="App container">
                <Navbar collapseOnSelect>
                    <Navbar.Brand>ABC Company</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to={'/'}>
                                <Nav.Item>
                                    <Nav.Link href={'/'}>Home</Nav.Link>
                                </Nav.Item>
                            </LinkContainer>
                            <LinkContainer to={'/employees'}>
                                <Nav.Item>
                                    <Nav.Link href={'/employees'}>Employees</Nav.Link>
                                </Nav.Item>
                            </LinkContainer>
                            <LinkContainer to={'/equipment'}>
                                <Nav.Item>
                                    <Nav.Link href={'/equipment'}>Equipment</Nav.Link>
                                </Nav.Item>
                            </LinkContainer>
                            <LinkContainer to={'/reservations'}>
                                <Nav.Item>
                                    <Nav.Link href={'/reservations'}>Reservations</Nav.Link>
                                </Nav.Item>
                            </LinkContainer>
                            {
                                this.state.isAuthenticated ?
                                    <LinkContainer to={'/'}>
                                        <Nav.Item onClick={this.handleLogout}>
                                            <Nav.Link href={'/'}>Logout</Nav.Link>
                                        </Nav.Item>
                                    </LinkContainer> :
                                    <Fragment>
                                        <LinkContainer to={'/login'}>
                                            <Nav.Item>
                                                <Nav.Link href={'/login'}>Login</Nav.Link>
                                            </Nav.Item>
                                        </LinkContainer>
                                        <LinkContainer to={'/register'}>
                                            <Nav.Item>
                                                <Nav.Link href={'/register'}>Register</Nav.Link>
                                            </Nav.Item>
                                        </LinkContainer>
                                    </Fragment>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default App;