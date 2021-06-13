import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect,
} from 'react-router-dom';

import Navbar from '../../inc/Navbar';
import Sidebar from '../../inc/Sidebar';
import Footer from '../../inc/Footer';
import Dashboard from './dashboard/Index';
import Users from './users/Index';
import DeviceTypes from './device-types/Index';
import ModelTypes from './model-types/Index';

function Index() {
    let { path } = useRouteMatch();
    const { logins } = useContext(AuthContext);
    if (!logins.isLogin) {
        return <Redirect to="/" />
    }
    return (
        <div className="hold-transition sidebar-mini">
            {/* Site wrapper */}
            <div className="wrapper">
                {/* Navbar */}
                <Navbar />
                {/* /.navbar */}
                {/* Main Sidebar Container */}
                <Sidebar />
                {/* Content Wrapper. Contains page content */}
                {/* Content Header (Page header) */}
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path={`${path}/users`} component={Users} />
                    <Route exact path={`${path}/device-types`} component={DeviceTypes} />
                    <Route exact path={`${path}/model-types`} component={ModelTypes} />
                    <Redirect from="/dashboard" to="/dashboard" />
                </Switch>
                {/* /.content-wrapper */}
                <Footer />
            </div>
        </div>
    )
}

export default Index
