import React, { useContext, } from 'react'
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
    const { dispatch, logins } = useContext(AuthContext);
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('logins');
        dispatch({
            type: 'LOGOUT'
        });
    }
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <div className="user-avatar">A</div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                        <a onClick={handleLogout} className="dropdown-item">
                            <i className="fas fa-sign-out-alt mr-2" /> Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>

    )
}

export default Navbar;
