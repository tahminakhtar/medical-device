import React, { useContext } from 'react'
import Pagination from "react-js-pagination";

import { OverviewContext } from '../../../context/OverviewContext';

const ModelTypes = () => {
    const { modelTypes, error } = useContext(OverviewContext);
    console.log(modelTypes);
    const modelTypeList = modelTypes ? modelTypes.map((list, index) => {
        return (
            <tr key={list.Id}>
                <th scope="row">{index + 1}</th>
                <td>{list.Brand}</td>
                <td>{list.Name}</td>
                <td>{list.DisplayName}</td>
                <td>{list.Description}</td>
            </tr>
        )
    }) : [];

    return (
        <div className="col-sm-6">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Model Datas List</h3>
                </div>
                <div className="card-body p-0">
                    <table className="table table-responsive" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ width: "10px" }}>#</th>
                                <th>Brand</th>
                                <th>Name</th>
                                <th>Display Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelTypeList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ModelTypes
