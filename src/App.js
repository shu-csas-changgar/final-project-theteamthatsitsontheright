import React ,{ Component } from "react";
import { Navbar, Nav, } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false
        };
    }

    userHasAuthenticated = authenticated => {
        this.setState({isAuthenticated: authenticated})
    };


    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };

        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Brand>ABC Company</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to={"/"}>
                                <Nav.Item>
                                    <Nav.Link href={"/"}>Home</Nav.Link>
                                </Nav.Item>
                            </LinkContainer>
                            <LinkContainer to={"/employees"}>
                                <Nav.Item>
                                    <Nav.Link href={"/employees"}>Employees</Nav.Link>
                                </Nav.Item>
                            </LinkContainer>
                            <LinkContainer to={"/equipment"}>
                                <Nav.Item>
                                    <Nav.Link href={"/equipment"}>Equipment</Nav.Link>
                                </Nav.Item>
                            </LinkContainer>
                            <LinkContainer to={"/reservations"}>
                                <Nav.Item>
                                    <Nav.Link href={"/reservations"}>Reservations</Nav.Link>
                                </Nav.Item>
                            </LinkContainer>
                            <LinkContainer to={"/login"}>
                                <Nav.Item>
                                    <Nav.Link href={"/login"}>Login</Nav.Link>
                                </Nav.Item>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default App;