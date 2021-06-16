import React, { useContext, useState } from 'react'
import axios from "axios";

import { API_URL } from '../../../config/config';
import { ModelTypeContext } from '../../../context/ModelTypeContext';
import { DeviceTypeContext } from '../../../context/DeviceTypeContext';
interface ModelType {
    BrandId: string,
    Name: string,
    TypeId: number,
    Comment: string,
}
interface Errors {
    BrandId?: string,
    Name?: string,
    TypeId?: string,
    Comment?: string,
}


const ModelTypeList = () => {
    const { authToken, } = useContext(ModelTypeContext);
    const { deviceTypes, } = useContext(DeviceTypeContext);
    const [submit, setSubmit] = useState<boolean>(false);
    const [message, setMsg] = useState<string>('');
    const [state, setstate] = useState<ModelType>({
        BrandId: '',
        Name: '',
        TypeId: 1,
        Comment: '',
    });

    const [errors, setErrors] = useState<Errors>({
        BrandId: '',
        Name: '',
        TypeId: '',
        Comment: '',
    });

    const [isError, setIsError] = useState<boolean>(false);

    const handleChange = (e: any) => {
        let { name, value } = e.target;
        if (name == 'TypeId')
            value = parseInt(value);
        setstate({ ...state, [name]: value });
    };
    const resetData = () => {
        setErrors({
            BrandId: '',
            Name: '',
            TypeId: '',
            Comment: '',
        })
        setstate({
            BrandId: '',
            Name: '',
            TypeId: 1,
            Comment: '',
        })
        setIsError(false);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSubmit(true);
        axios
            .post(`${API_URL}/devicemodel`, state, authToken)
            .then((resp) => {
                console.log(resp.data);
                setSubmit(false);
                resetData();
                setMsg('<p className="text-success" >Save successfully</p>')
            })
            .catch((err) => {
                setSubmit(false);
                if (err?.response?.data?.errors) {
                    let data = err.response.data;
                    console.log(err.response.data.errors);
                    if (!data.success && data.errors) {
                        setIsError(true);
                        let error = data.errors;
                        Object.keys(error).map((key) => {
                            if (error[key]['isNotEmpty'])
                                error[key] = error[key]['isNotEmpty'];
                            if (error[key]['isNumber'])
                                error[key] = error[key]['isNumber'];
                            if (error[key]['minLength'])
                                error[key] = error[key]['minLength'];
                        });
                        setErrors(error);
                    }
                }
                setMsg("")
            });
    }
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Add New</h3>
            </div>
            <div className="card-body p-0">
                <div className="row justify-content-md-center mb-2">
                    {message ? message : ''}
                </div>
                <div className="row justify-content-md-center mt-5 pb-5">
                    <div className="col-sm-6">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input
                                        name="BrandId"
                                        onChange={handleChange}
                                        className={`form-control ${isError ? "is-invalid" : ""}`}
                                        type="text"
                                        placeholder="Enter Brand id"
                                        value={state.BrandId}
                                    />
                                    <span className="error invalid-feedback text-capitalize">{errors.BrandId}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input
                                        name="Name"
                                        onChange={handleChange}
                                        className={`form-control ${isError ? "is-invalid" : ""}`}
                                        type="text"
                                        placeholder="Enter Name"
                                        value={state.Name}
                                    />
                                    <span className="error invalid-feedback text-capitalize">{errors.Name}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <select className={`form-control ${isError && errors.TypeId ? 'is-invalid' : ''}`} onChange={handleChange} name="TypeId" value={state.TypeId}>
                                        <option value="">Select</option>
                                        {deviceTypes.map((el: any) => {
                                            return (
                                                <option key={el.Id} value={el.Id}>{el.Description}</option>
                                            )
                                        })}
                                    </select>
                                    <span className="error invalid-feedback text-capitalize">{errors.TypeId}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input
                                        name="Comment"
                                        onChange={handleChange}
                                        className={`form-control ${isError ? "is-invalid" : ""}`}
                                        type="text"
                                        placeholder="Enter Comment"
                                        value={state.Comment}
                                    />
                                    <span className="error invalid-feedback text-capitalize">{errors.Comment}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-right">
                                    <button type="submit" disabled={submit ? true : false} className="btn btn-outline-primary">
                                        {submit ? <i className="fa fa-spinner fa-spin mr-1"></i> : ""}
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ModelTypeList
