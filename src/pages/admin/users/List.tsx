import React, { useContext } from 'react'
import Pagination from "react-js-pagination";

import { UserContext } from '../../../context/UserContext';

const UserList = () => {
    const { users, error, activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, handlePageChange } = useContext(UserContext);
    console.log(users);
    const userList = users ? users.map((list: any, index: number) => {
        return (
            <tr key={list.id}>
                <th scope="row">{index + 1}</th>
                <td>{list.first_name}</td>
                <td>{list.last_name}</td>
                <td>{list.email}</td>
            </tr>
        )
    }) : [];

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Users List</h3>

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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? <tr><td align="center">{error}</td></tr> : userList}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default UserList
