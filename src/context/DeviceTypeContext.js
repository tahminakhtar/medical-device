import React, { createContext, useState, useEffect, useContext, useReducer } from 'react';
import { API_URL } from '../config/config';
import { accessHeader } from '../config/accessHeader';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { deviceTypeReducer } from './reducers/deviceTypeReducer';
export const DeviceTypeContext = createContext();

const DeviceTypeContextProvider = (props) => {
    const initialState = {
        deviceTypes: [],
        activePage: 1,
        itemsCountPerPage: 40,
        totalItemsCount: 1,
        pageRangeDisplayed: 5,
        error: null,

    }
    const [state, dispatchDeviceType] = useReducer(deviceTypeReducer, initialState)
    const { logins } = useContext(AuthContext);
    const authToken = accessHeader(logins.accessToken);

    useEffect(() => {
        axios.get(`${API_URL}/devicetype?limit=${state.itemsCountPerPage}&page=${state.activePage}`, authToken)
            .then((res) => {
                state.totalItemsCount = res.data[1];
                state.activePage = 1;
                dispatchDeviceType({ type: 'DEVICE_TYPES', deviceTypes: res.data[0] });
            }).catch(err => {
                dispatchDeviceType({ type: 'ERROR', error: err.response.data });
            })
    }, []);



    //Paginate (Page Change) 
    const handlePageChange = (pageNumber) => {
        axios.get(`${API_URL}/devicetype?limit=${state.itemsCountPerPage}&page=${pageNumber}`, authToken)
            .then(res => {
                console.log(res.data);
                state.totalItemsCount = res.data[1];
                state.activePage = pageNumber;
                dispatchDeviceType({ type: 'DEVICE_TYPES', deviceTypes: res.data[0] })
            }).catch(err => {
                dispatchDeviceType({ type: 'ERROR', error: err.response.data });
            })
    }
    const values = {
        ...state,
        dispatchDeviceType,
        handlePageChange
    }
    return (
        <DeviceTypeContext.Provider value={values}>
            {props.children}
        </DeviceTypeContext.Provider>
    )
}

export default DeviceTypeContextProvider