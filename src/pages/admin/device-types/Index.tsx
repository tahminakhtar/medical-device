import React from 'react'
import DeviceTypeContextProvider from '../../../context/DeviceTypeContext';
import DeviceTypeList from './List';

const DeviceTypes = () => {
    return (
        <DeviceTypeContextProvider>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>DeviceTypes</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Device Types</li>
                                </ol>
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <DeviceTypeList />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </DeviceTypeContextProvider>
    )
}

export default DeviceTypes
