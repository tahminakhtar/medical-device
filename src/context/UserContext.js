import React, { createContext, useState, useEffect, useContext, useReducer } from 'react';
import { API_URL } from '../config/config';
import { accessHeader } from '../config/accessHeader';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { userReducer } from './reducers/userReducer';
export const UserContext = createContext();

const UserContextProvider = (props) => {
    const initialState = {
        users: [],
        activePage: 1,
        itemsCountPerPage: 10,
        totalItemsCount: 1,
        pageRangeDisplayed: 5,
        error: null,

    }
    const [state, dispatchUser] = useReducer(userReducer, initialState)
    const { logins } = useContext(AuthContext);
    const authToken = accessHeader(logins.accessToken);

    useEffect(() => {
        axios.get(`${API_URL}/users?limit=${state.itemsCountPerPage}&page=${state.activePage}&sortByDesc=id`, authToken).then((res) => {
            state.totalItemsCount = res.data[1];
            state.activePage = 1;
            dispatchUser({ type: 'USERSLIST', users: res.data[0] });
        }).catch(err => {
            dispatchUser({ type: 'ERROR', error: err.response.data });
        })
    }, []);



    //Paginate (Page Change) 
    const handlePageChange = (pageNumber) => {
        axios.get(`${API_URL}/users?limit=${state.itemsCountPerPage}&page=${pageNumber}&sortByDesc=id`, authToken)
            .then(res => {
                console.log(res.data);
                state.totalItemsCount = res.data[1];
                state.activePage = pageNumber;
                dispatchUser({ type: 'USERSLIST', users: res.data[0] })
            }).catch(err => {
                dispatchUser({ type: 'ERROR', error: err.response.data });
            })
    }
    const values = {
        ...state,
        dispatchUser,
        handlePageChange
    }
    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider