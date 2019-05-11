import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './components/AppliedRoute';

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Employees from "./pages/Employees";
import Equipment from "./pages/Equipment";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path="/login" exact component={Login} props={childProps}/>
        <AppliedRoute path="/register" exact component={Register} props={childProps}/>
        <AppliedRoute path="/employees" exact component={Employees} props={childProps}/>
        <AppliedRoute path="/equipment" exact component={Equipment} props={childProps}/>
        <AppliedRoute path="/reservations" exact component={Reservations} props={childProps}/>
        <Route component={NotFound}/>
    </Switch>