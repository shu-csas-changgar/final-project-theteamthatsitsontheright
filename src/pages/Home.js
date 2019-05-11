import React, { Component } from "react";
import "./Home.css";
import PersonalDash from "./PersonalDash";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Home">
                <div className={"Lander"}>
                    <h1>Welcome to the ABC Company IT Page!</h1>
                    {
                        (this.props.isAuthenticated === true) ?
                            <PersonalDash/> :
                            <div/>
                    }
                </div>
            </div>
        )
    }
}

export default Home;