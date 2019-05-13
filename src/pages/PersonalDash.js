import React, { Component } from 'react';

class PersonalDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            equipment:[],
            reservations:[],
            show: false,
            employee: this.props.loggedIn, 
            error: ''
        };
    }

    componentDidMount = () => {  
        const data = {
            search: this.state.employee.employee_id,
            search_field: 'employee_id'
        };

        fetch('/equipment/filter_personal', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({error: 'Bad response from the server'});
            }
            return response.json();
        }).then((data) => {
            this.setState({equipment: data});
        }).catch((error) => {
            console.log(error);
            this.setState({'error': error});
        });
    
        fetch('/reservations/filter_personal', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                this.setState({error: 'Bad response from the server'});
            }
            return response.json();
        }).then((data) => {
            this.setState({reservations: data});
        }).catch((error) => {
            console.log(error);
            this.setState({'error': error});
        });
    }

    render() {
        return (
            <div>
                Personal Dash of

                <div> {this.state.employee.first_name} {this.state.employee.last_name} </div>
                <div>
                <br /> 
                </div>
                Current equipment under your name 

                <table className={"equipment"}>
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
                                </tr>
                            )
                        }
                        </tbody>
                    </table>

                    <div> 
                    <br /> 
                    </div>

                    <div> Reservations under your name </div>

                    <table className={"reservations"}>
                        <thead>
                        <tr>
                            <th>Equipment Name</th>
                            <th>Equipment Type</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Vendor Name</th>
                            <th>Office Name</th> 
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.reservations.map(item =>
                                <tr key={item.equipment_id}>
                                    <td>{item.equipment_name}</td>
                                    <td>{item.reservation_start}</td>
                                    <td>{item.reservation_end}</td>
                                    <td>{item.vendor_name}</td>
                                    <td>{item.office_name}</td> 
                                </tr>
                            )
                        }
                        </tbody>
                    </table>

            </div>
        )
    }
}

export default PersonalDash;