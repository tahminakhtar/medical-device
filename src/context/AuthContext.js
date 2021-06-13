import React, { createContext, useReducer, useEffect, useState } from 'react';
import { authReducer } from './reducers/authReducer';

/* create auth context */
export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* auth context initial state */
    const initialState = {
        isLogin: false,
        accessToken: '',
        user: {}
    }

    /* call auth reducer and set state */

    const [logins, dispatch] = useReducer(authReducer, initialState, () => {
        try {
            const item = localStorage.getItem('logins');
            const login = item ? JSON.parse(item) : false;
            if (login) {
                return login
            } else {
                return initialState;
            }
        } catch (error) {
            return false;
        }
    });

    useEffect(() => {
        localStorage.setItem('logins', JSON.stringify(logins));
    }, [logins]);

    /* shared state */
    const values = {
        logins,
        dispatch,
        show,
        handleShow,
        handleClose,
    }

    return (
        <AuthContext.Provider value={values}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
