import React, { Component } from "react";
import { Form, Row, Col, FormControl, FormGroup, Button, Modal } from "react-bootstrap";

class Equipment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            equipment: [],
            equipment_types: [],
            contract_types: [],
            viewModalShow: false,
            createModalShow: false,
            equipment_focus: null,
            offices: [],
            search: '',
            search_field: 'equipment_name',
            equipment_type: '1',
            contract_type: '1',
            error: '',
        };

        this.openViewModal = (item) => {
            this.setState({ viewModalShow: true });
            this.setState({ equipment_f: item });
        };

        this.hideViewModal = () => {
            this.setState({ viewModalShow: false });
            this.setState({ equipment_f: null });
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        // This is used to get the contract_types for the filter dropdown.
        if (this.state.equipment_types.length === 0) {
            fetch('/equipment/contract_types', {
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

        if (this.state.contract_types.length === 0) {
            //This is used to get the list of equipment types for the filter dropdown.
            fetch('/equipment/equipment_types', {
                method: 'GET'
            }).then((response) => {
                if (response.status >= 400) {
                    this.setState({error: 'Bad response from the server'})
                }
                return response.json();
            }).then((data) => {
                this.setState({equipment_types: data});
            }).catch((error) => {
                console.log(error);
                this.setState({error: error});
            });
        }

        // This is used to get a list of the equipments for the table.
        fetch('/equipment', {
            method: 'GET'
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({ error: 'Bad response from the server' })
            }
            return response.json();
       }).then((data) => {
            this.setState({ equipment: data });
            this.setState({ offices: data});
            console.log(data);
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
            equipment_type: this.state.equipment_type
        };
        fetch('/equipment/filter', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({error: 'Bad response from the server'});
            }
            return response.json();
        }).then((data) => {
            this.setState({ equipment: data});
        }).catch((error) => {
            console.log(error);
            this.setState({'error': error});
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            new_equipment_name: this.state.new_equipment_name,
            new_equipment_type: this.state.new_equipment_type,
            new_contract_type: this.state.new_contract_type,
            new_vendor_name: this.state.new_vendor_name,
            new_office_name: this.state.new_office_name,
        };
        fetch('/equipment/new', {
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
            if (data === 'That equipment already exists.') {
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


    render() {
        return (
            <div>
                <h1>Equipment</h1>
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
                                        <option key={'equipment_name'} value={'equipment_name'}>Equipment Name</option>
                                        <option key={'vendor_name'} value={'vendor_name'}>Vendor Name</option>
                                        <option key={'office_name'} value={'office_name'}>Office Name</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId={'equipment_type'} bssize={'large'}>
                                    <FormControl as={'select'} onChange={this.handleChange}>
                                        {
                                            this.state.equipment_types.map((type) => {
                                                return (
                                                    <option
                                                        value={type.equipment_type_id}
                                                        key={type.equipment_type_id}
                                                    >
                                                        {type.type_name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId={'contract_type'} bssize={'large'}>
                                    <FormControl as={'select'} onChange={this.handleChange}>
                                        {
                                            this.state.contract_types.map((type) => {
                                                return (
                                                    <option
                                                        value={type.contract_type_id}
                                                        key={type.contract_type_id}
                                                    >
                                                        {type.contract_name}
                                                    </option>
                                                )
                                            })
                                        }
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
                        Add new Item
                    </Button>
                    <table className={"table table-hover"}>
                        <thead>
                        <tr>
                            <th>Equipment Name</th>
                            <th>Equipment Type</th>
                            <th>Contract Type</th>
                            <th>Vendor Name</th>
                            <th>Office Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.equipment.map(item =>
                                <tr key={item.equipment_id}>
                                    <td>{item.equipment_name}</td>
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
                        show={this.state.show}
                        onHide={this.handleHide}
                        aria-labelledby="contained-modal-title-vcenter"
                        size={'lg'}
                        centered
                    >
                        <Modal.Header closeButton={true}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Equipment View
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                (this.state.equipment == null) ?
                                    <div>null</div> :
                                    <div>
                                        <Row>
                                            <Col>
                                                <h5>Equipment Name: {this.state.equipment_name}</h5>
                                            </Col>
                                            <Col>
                                                <h5>Equipment ID: {this.state.equipment_id}</h5>
                                            </Col>
                                            <Col>
                                                <h5>Equipment Type: {this.state.type_name}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h5>Contract Type: {this.state.contract_type}</h5>
                                            </Col>
                                            <Col>
                                                <h5>Vendor Name: {this.state.vendor_name}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h5>Office: {this.state.office_name}</h5>
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
                                Add new Equipment
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <h3>{this.state.error}</h3>
                                <FormGroup controlId={'equipment_name'} bssize={'large'}>
                                    <h3>Equipment Name</h3>
                                    <FormControl
                                        type={'string'}
                                        value={this.state.equipment_name}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <FormGroup controlId={'equipment_type'} bssize={'large'}>
                                    <h3>Equipment Type</h3>
                                    <FormControl
                                        type={'string'}
                                        value={this.state.equipment_type}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <FormGroup controlId={'contract_type'} bssize={'large'}>
                                    <h3>Ownership Type</h3>
                                    <FormControl as={'select'} onChange={this.handleChange}>
                                        {
                                            this.state.contract_types.map((type) => {
                                                return (
                                                    <option
                                                        value={type.contract_type_id}
                                                        key={type.contract_type_id}
                                                    >
                                                        {type.contract_name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </FormControl>
                               </FormGroup>
                                <FormGroup controlId={'vendor_name'} bssize={'large'}>
                                    <h3>Vendor Name</h3>
                                    <FormControl
                                        value={this.state.vendor_name}
                                        onChange={this.handleChange}
                                        type={"string"}
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
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"
                                    onClick={this.hideCreateModal}>
                                Close
                            </Button>
                            <Button variant="primary"
                            block
                            bssize={"large"}
                            type={"submit"}
                            >
                                Add Item
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Equipment;
