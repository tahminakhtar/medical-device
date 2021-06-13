import React, { createContext, useState, useEffect, useContext, useReducer } from 'react';
import { API_URL } from '../config/config';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import { deviceModelReducer } from './reducers/deviceModelReducer';
export const DeviceModelContext = createContext();

const DeviceModelContextProvider = (props) => {
    const initialState = {
        amenities: [],
        deviceModel: {
            id: '',
            icon_name: '',
            deviceModel_name: '',
            deviceModel_name_pt: '',
        },
        show: false,
        editMode: false,
        isSubmit: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 5,

    }
    const [state, dispatchDeviceModel] = useReducer(deviceModelReducer, initialState)
    const { login, authUsers } = useContext(AuthContext);

    const [accessToken, setAccessToken] = useState(() => {
        return login ? authUsers.authToken : '';
    });

    var authToken = {
        headers: { "Authorization": `Bearer ${accessToken}` }
    };

    useEffect(() => {
        axios.get(`${API_URL}/amenities`, authToken).then((res) => {
            console.log(res.data);

            state.itemsCountPerPage = res.data.amenities.per_page;
            state.totalItemsCount = res.data.amenities.total;
            state.activePage = res.data.amenities.current_page;
            dispatchDeviceModel({ type: 'AMENITIESLIST', amenities: res.data.amenities.data });
        })
    }, []);

    /* edit deviceModel by id */
    const editDeviceModel = (id) => {
        axios.get(`${API_URL}/amenities/${id}`, authToken)
            .then(res => {
                if (res.data.status) {
                    console.log(res.data.deviceModel)
                    let deviceModel = {
                        id: res.data.deviceModel.id,
                        deviceModel_name: res.data.deviceModel.deviceModel_name,
                        deviceModel_name_pt: res.data.deviceModel.deviceModel_name_pt,
                        icon_name: res.data.deviceModel.icon_name
                    };
                    dispatchDeviceModel({ type: 'EDITAMENITY', deviceModel })
                } else {
                    toast('Opps! Data not found.')
                }
            })
    }

    /* delete deviceModel */
    const deleteDeviceModel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to revert!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                axios.delete(`${API_URL}/amenities/${id}`, authToken)
                    .then(res => {
                        if (res.data.status) {
                            toast.success("Success !", {
                                position: toast.POSITION.TOP_RIGHT,
                                type: toast.TYPE.SUCCESS
                            });
                            let lists = state.amenities.filter(deviceModel => deviceModel.id != id);
                            dispatchDeviceModel({ type: 'DELETEAMENITY', lists })
                        } else {
                            toast.success("Failed !", {
                                position: toast.POSITION.TOP_RIGHT,
                                type: toast.TYPE.ERROR
                            });
                        }
                    })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.close();
            }
        })
    }

    //Paginate (Page Change) 
    const handlePageChange = (pageNumber) => {
        axios.get(`${API_URL}/amenities?page=` + pageNumber, authToken)
            .then(res => {
                state.itemsCountPerPage = res.data.amenities.per_page;
                state.totalItemsCount = res.data.amenities.total;
                state.activePage = res.data.amenities.current_page;
                dispatchDeviceModel({ type: 'AMENITIESLIST', amenities: res.data.amenities.data })
            })
    }
    const values = {
        dispatchDeviceModel, state, editDeviceModel, deleteDeviceModel, handlePageChange
    }
    return (
        <DeviceModelContext.Provider value={values}>
            {props.children}
        </DeviceModelContext.Provider>
    )
}

export default DeviceModelContextProvider