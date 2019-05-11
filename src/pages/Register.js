import React, {Component} from 'react';
import './Register.css';
import {Button, FormGroup, FormControl } from "react-bootstrap";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            password: '',
            re_password: '',
            phone_number: '',
            office_id: 0,
            offices: [],
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        fetch('/register', {
            method: 'GET'
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({ error: 'Bad response from the server' })
            }
            return response.json();
        }).then((data) => {
            this.setState({ offices: data });
            console.log(data);
        }).catch((error) => {
            console.log(error);
            this.setState({ error: error });
        })
    };

    validateForm = () => {
        return this.state.first_name.length > 0 &&
            this.state.last_name.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.re_password &&
            this.state.phone_number != null &&
            this.state.office_id > 0
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.first_name.toLowerCase() + '.' +  this.state.last_name.toLowerCase() + '@abc.com',
            password: this.state.password,
            phone_number: this.state.phone_number,
            office_id: this.state.office_id
        };
        fetch('/register/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            }).then((response) => {
                console.log(data);
                if (response.status >= 400) {
                    this.setState({ error: 'Bad response from the server.' })
                }
                return response.json();
            }).then((data) => {
                if (data === 'That employee already exists.') {
                    this.setState({ error: data })
                } else {
                    this.props.userHasAuthenticated(true);
                    this.props.loginUser(data[0]);
                    this.props.history.push('/')
                }
            }).catch((error) => {
                console.log(error);
                this.setState({ error: error });
            }
        );
    };

    render = () => {

        return (
            <div className={"Register"}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <h3>{this.state.error}</h3>
                    <FormGroup controlId={'first_name'} bssize={'large'}>
                        <h3>First Name</h3>
                        <FormControl
                            type={'string'}
                            value={this.state.first_name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId={'last_name'} bssize={'large'}>
                        <h3>Last Name</h3>
                        <FormControl
                            type={'string'}
                            value={this.state.last_name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId={'phone_number'} bssize={'large'}>
                        <h3>Phone Number</h3>
                        <FormControl
                            type={'tel'}
                            value={this.state.phone_number}
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
                    <FormGroup controlId={'re_password'} bssize={'large'}>
                        <h3>Re-enter Password</h3>
                        <FormControl
                            type={'password'}
                            value={this.state.re_password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId={'office_id'} bssize={'large'}>
                        <h3>Select Your Office</h3>
                        <FormControl as={'select'} onChange={this.handleChange}>
                            <option value={0}>Make a selection</option>
                            {
                                this.state.offices.map(office => {
                                    return(
                                        <option key={office.office_id} value={office.office_id}>{office.office_name}</option>
                                    )
                                })
                            }
                        </FormControl>
                    </FormGroup>
                    <Button
                        block
                        bssize={"large"}
                        disabled={!this.validateForm()}
                        type={"submit"}
                    >
                        Register
                    </Button>
                </form>
            </div>
        );
    }
}

export default Register;