import React, { createContext, useState, useEffect, useContext, useReducer } from 'react';
import { API_URL } from '../config/config';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { overviewReducer } from './reducers/overviewReducer';
export const OverviewContext = createContext();

const OverviewContextProvider = (props) => {
    const initialState = {
        modelTypes: [],
        modelDatas: [],
        brand: 'Hamilton',
        model: 'Galileo'

    }
    const [state, dispatchOverview] = useReducer(overviewReducer, initialState)
    const { logins } = useContext(AuthContext);
    const [accessToken, setAccessToken] = useState(() => {
        return logins ? logins.accessToken : '';
    });

    var authToken = {
        headers: { "authorization": `${accessToken}` }
    };

    useEffect(() => {
        axios.get(`${API_URL}/overview/modeltype`, authToken).then((res) => {
            dispatchOverview({ type: 'MODEL_TYPES', modelTypes: res.data });
        })
    }, []);

    useEffect(() => {
        axios.get(`${API_URL}/overview/modeldata/${state.brand}/${state.model}`, authToken).then((res) => {
            dispatchOverview({ type: 'MODEL_DATAS', modelDatas: res.data });
        })
    }, []);

    const values = {
        ...state,
        dispatchOverview,
    }
    return (
        <OverviewContext.Provider value={values}>
            {props.children}
        </OverviewContext.Provider>
    )
}

export default OverviewContextProvider