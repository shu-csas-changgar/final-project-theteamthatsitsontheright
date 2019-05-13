import React, { Component } from "react";
import { Form, Row, Col, FormControl, FormGroup, Button, Modal } from "react-bootstrap";

class Reservations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: [],
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
            new_office: ''
        };

        this.openViewModal = (item) => {
            this.setState({ viewModalShow: true });
            this.setState({ reservation_focus: item });
        };

        this.hideViewModal = () => {
            this.setState({ viewModalShow: false });
            this.setState({ reservation_focus: null });
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
        this.handleCreate = this.handleCreate.bind(this);
    }

    validateForm = () => {
        return this.state.new_reservation_name.length > 0 &&
            this.state.new_room_id.length > 0 &&
            this.state.new_start_time.length > 0 &&
            this.state.new_end_time.length > 0;
            //this.state.new_office.length > 0;
    };

    componentDidMount = () => {
        // This is used to get the contract_types for the filter dropdown.
        if (this.state.reservation_types.length === 0) {
            fetch('/reservations/contract_types', {
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
        fetch('/reservations', {
            method: 'GET'
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({ error: 'Bad response from the server' })
            }
            return response.json();
        }).then((data) => {
            this.setState({ reservations: data });
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

    handleCreate = (event) => {
        event.preventDefault();
        const data = {
            new_reservation_name: this.state.new_reservation_name,
            new_room_id: this.state.new_room_id,
            new_start_time: this.state.new_start_time,
            new_end_time: this.state.new_end_time
        };
        fetch('/reservations/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({error: 'Bad response from server'})
            }
            return response.json();
        }).then((data) => {
            this.hideCreateModal();
        }).catch((error) => {
            console.log(error);
            this.setState({error: error});
        })

        // This is used to get a list of the reservations for the table.
        fetch('/reservations', {
            method: 'GET'
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({ error: 'Bad response from the server' })
            }
            return response.json();
        }).then((data) => {
            this.setState({ reservations: data });
        }).catch((error) => {
            console.log(error);
            this.setState({ error: error });
        })
    };

    handleDelete = (event) => {
        event.preventDefault();
        const data = {
            reservation_id: this.state.reservation_focus.reservation_id
        };
        fetch('reservations/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({ error: 'Bad response from server' })
            }
            return response.json();
        }).then((data) => {
            this.setState({ error: data });
        }).catch((error) => {
            console.log(error);
            this.setState({error: error});
        });
        // This is used to get a list of the reservations for the table.
        fetch('/reservations', {
            method: 'GET'
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({ error: 'Bad response from the server' })
            }
            return response.json();
        }).then((data) => {
            this.setState({ reservation: data });
        }).catch((error) => {
            console.log(error);
            this.setState({ error: error });
        });
        this.componentDidMount();
        this.hideViewModal();
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
                            this.state.reservations.map(item =>
                                <tr key={item.reservation_id}>
                                    <td>{item.reservation_name}</td>
                                    <td>{item.room_id}</td>
                                    <td>{item.reservation_start}</td>
                                    <td>{item.reservation_end}</td>
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
                        onHide={this.hideViewModal}
                        aria-labelledby="contained-modal-title-vcenter"
                        size={'lg'}
                        centered
                    >
                        <Modal.Header closeButton={true}>
                            <Modal.Title id="contained-modal-title-vcenter">
                               Reservation View
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                              (this.state.reservation_focus === null) ?
                                    <div>null</div> :
                                    <div>
                                        <Row>
                                            <Col>
                                                <h5>Reservation Name: {this.state.reservation_focus.reservation_name}</h5>
                                            </Col>
                                            <Col>
                                                <h5>Reservation ID: {this.state.reservation_focus.reservation_id}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h5>Start Time: {this.state.reservation_focus.reservation_start}</h5>
                                            </Col>
                                            <Col>
                                                <h5>End Time: {this.state.reservation_focus.reservation_end}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h5>Room ID: {this.state.reservation_focus.room_id}</h5>
                                            </Col>
                                            <Col>
                                                <h5>Office Name: {this.state.reservation_focus.office_name}</h5>
                                            </Col>
                                        </Row>
                                    </div>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleDelete}>
                                Delete Item
                            </Button>
                        </Modal.Footer>
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
                            <form noValidate onSubmit={this.handleCreate}>
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
                                    <h3>Start Time (YYYY-MM-DD hh:mm)</h3>
                                    <FormControl
                                        type={'string'}
                                       value={this.state.new_start_time}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <FormGroup controlId={'new_end_time'} bssize={'large'}>
                                    <h3>End Time (YYYY-MM-DD hh:mm)</h3>
                                    <FormControl
                                        type={'string'}
                                        value={this.state.new_end_time}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                              <Button variant="secondary"
                                      onClick={this.hideCreateModal}>
                                  Close
                              </Button>
                              <Button variant="primary"
                                      type={"submit"}
                                      disabled={!this.validateForm()}
                                      onClick={this.handleCreate}>
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
