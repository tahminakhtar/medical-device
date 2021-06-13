import React, { createContext, useState, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { modelTypeReducer } from './reducers/modelTypeReducer';
export const ModelTypeContext = createContext();

const ModelTypeContextProvider = (props) => {
    const initialState = {
        modelType: {
            BrandId: '',
            Name: '',
            TypeId: '',
            Comment: '',
        },

    }
    const [state, dispatchModelType] = useReducer(modelTypeReducer, initialState)

    const { logins } = useContext(AuthContext);
    const [accessToken, setAccessToken] = useState(() => {
        return logins ? logins.accessToken : '';
    });

    var authToken = {
        headers: { "authorization": `${accessToken}` }
    };
    const values = {
        ...state,
        authToken,
        dispatchModelType,
    }
    return (
        <ModelTypeContext.Provider value={values}>
            {props.children}
        </ModelTypeContext.Provider>
    )
}

export default ModelTypeContextProvider