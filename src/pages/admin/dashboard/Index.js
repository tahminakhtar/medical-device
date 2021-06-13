import React from 'react'
import OverviewContextProvider from '../../../context/OverviewContext';
import ModelTypes from './ModelTypes';
import ModelDatas from './ModelDatas';
const Dashboard = () => {
    return (
        <OverviewContextProvider>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </section>
                {/* Main content */}
                <section className="content">
                    <div class="container-fluid">
                        <div className="row">
                            <ModelTypes />
                            <ModelDatas />
                        </div>
                    </div>
                </section>
            </div>
        </OverviewContextProvider>
    )
}

export default Dashboard
