import { FC, useContext, useState } from 'react'
import axios from "axios";

import { API_URL } from '../../../config/config';
import { OverviewContext } from '../../../context/OverviewContext';
import { IBrand, IModel } from '../../../interfaces/IModelType';
import { IModelData } from '../../../interfaces/IModelData';

const ModelTypes: FC = () => {
    const { modelDatas, modelTypes, error, dispatchOverview, authToken } = useContext(OverviewContext);
    const [submit, setSubmit] = useState(false);
    const [state, setstate] = useState({
        BrandId: '',
        Name: '',
    });
    const modelDataList = modelDatas ? modelDatas.map((list: IModelData, index: any) => {
        return (
            <tr key={list.Id}>
                <th scope="row">{index + 1}</th>
                <td>{list.Name}</td>
                <td>{list.DisplayName}</td>
                <td>{list.Description}</td>
            </tr>
        )
    }) : [];


    const handleChange = (e: any) => {
        let { name, value } = e.target;
        if (name == 'TypeId')
            value = Number(value);
        setstate({ ...state, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSubmit(true);
        axios.get(`${API_URL}/overview/modeldata/${state.BrandId}/${state.Name}`, authToken).then((res) => {
            setSubmit(false);
            dispatchOverview({ type: 'MODEL_DATAS', modelDatas: res.data });
        })
    }
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Model Datas List</h3>
                <div className="card-tools">
                    <div className="row mt-2">
                        <form onSubmit={handleSubmit} className="form-row">
                            <div className="col-sm-5">
                                <select className="form-control" onChange={handleChange} name="BrandId" value={state.BrandId}>
                                    <option value="">Select Brand</option>
                                    {modelTypes.map((el: IBrand) => {
                                        return (
                                            <option key={el.Id} value={el.BrandId}>{el.BrandId}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-5">
                                <select className="form-control" onChange={handleChange} name="Name" value={state.Name}>
                                    <option value="">Select Model</option>
                                    {modelTypes.map((el: IModel) => {
                                        return (
                                            <option key={el.Id} value={el.Name}>{el.Name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-2">
                                <button type="submit" disabled={submit ? true : false} className="btn btn-outline-primary">
                                    {submit ? <i className="fa fa-spinner fa-spin mr-1"></i> : ""}
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: "10px" }}>#</th>
                            <th>Name</th>
                            <th>Display Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelDataList}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default ModelTypes
