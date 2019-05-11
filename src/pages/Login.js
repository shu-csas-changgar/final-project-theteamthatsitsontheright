import React, { Component } from 'react';
import "./Login.css";
import {Button, FormGroup, FormControl } from "react-bootstrap";

class Login extends Component {
    /**
     * Constructs a new Login component
     * @param props Input props, comes from parent component.
     */
    constructor(props) {
        super(props);

        // State of this component, contains values for the currently typed
        // user email and password, as well as error message.
        this.state = {
            email: "",
            password: "",
            error: ''
        };

        // Binds this components functions to this object.
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Determines if the form was correctly filled, meaning there was an email
     * and password.
     * @returns {boolean}
     */
    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
    };

    /**
     * Handle changes to the login form by changing the component state.
     * @param event
     */
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    /**
     * Handles the submission of the login form by posting an authentication
     * request to the node.js server.  If there is an error, pass it to the state,
     * otherwise log the user into the client state and redirect to the home page.
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        fetch("/login/auth", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            }).then((response) => {
                if (response.status >= 400) {
                    this.setState({ error: 'Bad response from server' });
                }
                return response.json();
            }).then((data) => {
                if (data.length === 0) {
                    this.setState({ error: 'Username or password is incorrect.' });
                } else {
                    this.props.userHasAuthenticated(true);
                    this.props.loginUser(data[0]);
                    this.props.history.push('/');
                }
            }).catch((error) => {
                console.log(error);
                this.setState({ error: error});
            }
        );
    };

    render() {

        return (
            <div className={"Login"}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <h3>{this.state.error}</h3>
                    <FormGroup controlId={"email"} bssize={"large"}>
                        <h3>Email</h3>
                        <FormControl
                            autoFocus
                            type={"email"}
                            value={this.state.email}
                            onChange={this.handleChange}
                            />
                    </FormGroup>
                    <FormGroup controlId={"password"} bssize={"large"}>
                        <h3>Password</h3>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type={"password"}
                            />
                    </FormGroup>
                    <Button
                        block
                        bssize={"large"}
                        disabled={!this.validateForm()}
                        type={"submit"}
                        >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;