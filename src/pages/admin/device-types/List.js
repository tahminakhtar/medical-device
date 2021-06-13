import React, { useContext } from 'react'
import Pagination from "react-js-pagination";

import { DeviceTypeContext } from '../../../context/DeviceTypeContext';

const DeviceTypeList = () => {
    const { deviceTypes, error, activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, handlePageChange } = useContext(DeviceTypeContext);
    const deviceTypeList = deviceTypes ? deviceTypes.map((list, index) => {
        return (
            <tr key={list.Id}>
                <th scope="row">{index + 1}</th>
                <td>{list.Description}</td>
            </tr>
        )
    }) : [];

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Device Types List</h3>

                {!error && <div className="card-tools">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onChange={handlePageChange}
                        innerClass="pagination pagination-sm float-right"
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
                }
            </div>
            <div className="card-body p-0">
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: "10px" }}>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? <tr><td colSpan="4" align="center">{error}</td></tr> : deviceTypeList}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default DeviceTypeList
