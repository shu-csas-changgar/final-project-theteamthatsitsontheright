import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {FormControl, FormGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Employee page component.
 */
class Employees extends Component {
    constructor(props) {
        super(props);

        /**
         * Current state of this employee page component.
         * users: List of users shown in the table.
         * show: True if the focused employee view is open,and false otherwise.
         * employee: Null if no employee is shown, but contains employee information for modal view.
         * search: Value in the search bar.
         * search_field: Filter choice, determined by dropdown option.
         * error: Error message sent back from server.
         * @type {{search: string, show: boolean, employee: null, error: string, users: Array, search_field: string}}
         */
        this.state = {
            users:[],
            show: false,
            employee: null,
            search: '',
            search_field: 'first_name',
            error: ''
        };

        /**
         * Function to open the employee view modal, with the given member.
         * @param member Member whose information is shown on the modal.
         */
        this.handleShow = (member) => {
            this.setState({ show: true });
            this.setState({ employee: member });
        };

        /**
         * Function to hide the modal view and set the employee state back to null.
         */
        this.handleHide = () => {
            this.setState({ show: false });
            this.setState({ employee: null });
        };

        /**
         * Function to handle changes in the state of this component.
         * @param event Event in the component.
         */
        this.handleChange = (event) => {
            this.setState({
                [event.target.id]: event.target.value
            });
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    /**
     * This function runs when the component is mounted (i.e., the page is loaded.)
     * The functionality sends a GET request to the server on the /employees route,
     * which is used to retrieve a list of all employees from the MySQL server.
     */
    componentDidMount = () => {
        // The fetch function call here makes a get request on the route /employees.
        fetch('/employees', {
            method: 'GET'
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({ error: 'Bad response from the server' })
            }
            return response.json();
        }).then((data) => {
            this.setState({ users: data });
        }).catch((error) => {
            console.log(error);
            this.setState({ error: error });
        })
    };

    /**
     * Function used to handle search filtering.  Uses the current search value and search_field
     * type value to make a POST request to the server, requesting all rows in the abc-corp table that
     * are like the search value.
     * @param event
     */
    handleSearch = (event) => {
        event.preventDefault();
        const data = {
            search: this.state.search,
            search_field: this.state.search_field
        };
        fetch('/employees/filter', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({error: 'Bad response from the server'});
            }
            return response.json();
        }).then((data) => {
            this.setState({users: data});
        }).catch((error) => {
            console.log(error);
            this.setState({'error': error});
        });
    };

    render() {
        return (
            <div>
                <h1>Employees</h1>
                <div className={"container"}>
                    <div className={"panel panel-default p50 uth-panel"}>
                        <Form noValidate onSubmit={this.handleSearch}>
                            <Row>
                                <Col>
                                    <FormGroup controlId={'search'} bssize={'large'}>
                                        <FormControl
                                            type={'string'}
                                            value={this.state.search}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup controlId={'search_field'} bssize={'large'}>
                                        <FormControl as={'select'} onChange={this.handleChange}>
                                            <option value={'first_name'}>First Name</option>
                                            <option value={'last_name'}>Last Name</option>
                                            <option value={'office_name'}>Office Name</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Button
                                        block
                                        bssize={"small"}
                                        type={"submit"}
                                    >
                                        Filter
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <table className={"table table-hover"}>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.users.map(member =>
                                    <tr key={member.employee_id}>
                                        <td>{member.first_name}</td>
                                        <td>{member.last_name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.phone_number}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => this.handleShow(member)}>
                                                View/Edit
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <Modal
                            show={this.state.show}
                            onHide={this.handleHide}
                            aria-labelledby="contained-modal-title-vcenter"
                            size={'lg'}
                            centered
                        >
                            <Modal.Header closeButton={true}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Employee View
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    (this.state.employee == null) ?
                                        <div>null</div> :
                                        <div>
                                            <Row>
                                                <Col>
                                                    <h5>First Name: {this.state.employee.first_name}</h5>
                                                </Col>
                                                <Col>
                                                    <h5>Last Name: {this.state.employee.last_name}</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h5>Email: {this.state.employee.email}</h5>
                                                </Col>
                                                <Col>
                                                    <h5>Phone Number: {this.state.employee.phone_number}</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h5>Office: {this.state.employee.office_name}, {this.state.employee.location_name}</h5>
                                                </Col>
                                                <Col>
                                                    <h5>Employee ID: {this.state.employee.employee_id}</h5>
                                                </Col>
                                            </Row>
                                        </div>
                                }
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

export default Employees;