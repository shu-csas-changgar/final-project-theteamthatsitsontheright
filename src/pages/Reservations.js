import React, { Component } from "react";
import { Form, Row, Col, FormControl, FormGroup, Button, Modal } from "react-bootstrap";

class Reservations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reservation: [],
            reservation_id: '',
            reservation_name: [],
            reservation_types: [],
            contract_types: [],
            viewModalShow: false,
            createModalShow: false,
            reservation_focus: null,
            search: '',
            search_field: 'reservation_name',
            reservation_type: '1',
            contract_type: '1',
            start_time: '',
            end_time: '',
            error: '',
            new_reservation_name: '',
            room_id: '',
            office_name: '',
            new_start_time: '',
            new_end_time: '',
            new_room_id: '',
            new_office_name: ''
        };

        this.openViewModal = (item) => {
            this.setState({ viewModalShow: true });
            this.setState({ reservation_f: item });
        };

        this.hideViewModal = () => {
            this.setState({ viewModalShow: false });
            this.setState({ reservation_f: null });
        };

        this.openCreateModal = () => {
            this.setState({ createModalShow: true });
        };

        this.hideCreateModal = () => {
            this.setState({ createModalShow: false });
        };

        this.handleChange = (event) => {
            this.setState({
                [event.target.id]: event.target.value
            });
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount = () => {
        // This is used to get the contract_types for the filter dropdown.
        if (this.state.reservation_types.length === 0) {
            fetch('/reservation/contract_types', {
                method: 'GET'
            }).then((response) => {
                if (response.status >= 400) {
                    this.setState({error: 'Bad response from the server'})
                }
                return response.json();
            }).then((data) => {
                this.setState({contract_types: data});
            }).catch((error) => {
                console.log(error);
                this.setState({error: error});
            });
        }

        // This is used to get a list of the reservations for the table.
        fetch('/reservation', {
            method: 'GET'
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({ error: 'Bad response from the server' })
            }
            return response.json();
        }).then((data) => {
            this.setState({ reservation: data });
            console.log(this.state.reservation);
        }).catch((error) => {
            console.log(error);
            this.setState({ error: error });
        })
    };

    handleSearch = (event) => {
        event.preventDefault();
        const data = {
            search: this.state.search,
            search_field: this.state.search_field,
            contract_type: this.state.contract_type,
            reservation_type: this.state.reservation_type
        };
        fetch('/reservation/filter', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({error: 'Bad response from the server'});
            }
            return response.json();
        }).then((data) => {
            this.setState({ reservation: data});
        }).catch((error) => {
            console.log(error);
            this.setState({'error': error});
        });
    };

    render() {
        return (
            <div>
                <h1>reservation</h1>
                <div className={'container'}>
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
                                        <option key={'reservation_name'} value={'reservation_name'}>Reservation Name</option>
                                        <option key={'room_id'} value={'room_id'}>Room ID</option>
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
                    <Button
                        block
                        bssize={'large'}
                        onClick={this.openCreateModal}
                    >
                        Add new Reservation
                    </Button>
                    <table className={"table table-hover"}>
                        <thead>
                        <tr>
                            <th>Reservation Name</th>
                            <th>Room ID</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.reservation.map(item =>
                                <tr key={item.reservation_id}>
                                    <td>{item.reservation_name}</td>
                                    <td>{item.type_name}</td>
                                    <td>{item.contract_name}</td>
                                    <td>{item.vendor_name}</td>
                                    <td>{item.office_name}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => this.openViewModal(item)}>
                                            View/Edit
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <Modal
                        show={this.state.viewModalShow}
                        onHide={this.state.hideViewModal}
                        aria-labelledby="contained-modal-title-vcenter"
                        size={'lg'}
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                               Reservation View
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                    <div>
                                        <Row>
                                            <Col>
                                                <h5>Reservation Name: {this.state.reservation_name}</h5>
                                            </Col>
                                            <Col>
                                                <h5>Reservation ID: {this.state.reservation_id}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h5>Start Time: {this.state.start_time}</h5>
                                            </Col>
                                            <Col>
                                                <h5>End Time: {this.state.end_time}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h5>Room ID: {this.state.room_id}</h5>
                                            </Col>
                                            <Col>
                                                <h5>Office Name: {this.state.office_name}</h5>
                                            </Col>
                                        </Row>
                                    </div>
                            }
                        </Modal.Body>
                    </Modal>
                    <Modal
                        show={this.state.createModalShow}
                        onHide={this.hideCreateModal}
                        aria-labelledby="contained-modal-title-vcenter"
                       size={'lg'}
                        centered
                    >
                        <Modal.Header closeButton={true}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add new Reservation
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <FormGroup controlId={'new_reservation_name'} bssize={'large'}>
                                <h3>Reservation Name</h3>
                                <FormControl
                                    type={'string'}
                                    value={this.state.new_reservation_name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId={'new_room_id'} bssize={'large'}>
                                <h3>Room ID</h3>
                                <FormControl
                                    type={'string'}
                                    value={this.state.new_room_id}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId={'new_start_time'} bssize={'large'}>
                                <h3>Start Time</h3>
                                <FormControl
                                    type={'string'}
                                   value={this.state.new_start_time}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId={'new_end_time'} bssize={'large'}>
                                <h3>End Time</h3>
                                <FormControl
                                    type={'string'}
                                    value={this.state.new_end_time}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"
                                    onClick={this.hideCreateModal}>
                                Close
                            </Button>
                            <Button variant="primary"
                                    type={"submit"}
                                    onClick={this.handleSubmit}>
                                Add Item
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Reservations
