import React from 'react'
import { useRouteMatch, NavLink } from "react-router-dom";

const Sidebar = () => {
    let { url } = useRouteMatch();
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="" className="brand-link">
                <img src="/assets/img/AdminLTELogo.png" alt="Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">Medical Device</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library */}

                        <li className="nav-item">
                            <NavLink exact to={`${url}`} activeClassName="active" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Dashboard
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to={`${url}/users`} activeClassName="active" className="nav-link">
                                <i className="nav-icon fas fa-users" />
                                <p>
                                    Users
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to={`${url}/device-types`} activeClassName="active" className="nav-link">
                                <i className="nav-icon fab fa-dyalog" />
                                <p>
                                    Device Types
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to={`${url}/model-types`} activeClassName="active" className="nav-link">
                                <i className="nav-icon fas fa-plus" />
                                <p>
                                    Create Model
                                </p>
                            </NavLink>
                        </li>

                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside >

    )
}

export default Sidebar;