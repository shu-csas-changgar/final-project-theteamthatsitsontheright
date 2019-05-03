import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import Equipment from "./pages/Equipment";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login}/>
        <Route path="/employees" exact component={Employees}/>
        <Route path="/equipment" exact component={Equipment}/>
        <Route path="/reservations" exact component={Reservations}/>
        <Route component={NotFound}/>
    </Switch>