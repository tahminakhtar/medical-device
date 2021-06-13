import React from 'react'
import ModelTypeContextProvider from '../../../context/ModelTypeContext';
import DeviceTypeContextProvider from '../../../context/DeviceTypeContext';
import Add from './Add';

const DeviceModel = () => {
    return (
        <ModelTypeContextProvider>
            <DeviceTypeContextProvider>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Create Model</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Create</li>
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
                                    <Add />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </DeviceTypeContextProvider>
        </ModelTypeContextProvider>
    )
}

export default DeviceModel
