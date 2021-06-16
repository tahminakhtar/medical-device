import React, { FC, useState, useContext, } from 'react'
import axios from "axios";
import {
    Redirect,
} from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { API_URL } from "../../config/config";
interface Props {
    props: any;
}
const Login: FC<Props> = ({ props }) => {
    const { dispatch, logins } = useContext(AuthContext);
    const [submit, setSubmit] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [credential, setCredential] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [isError, setIsError] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCredential({ ...credential, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmit(true);
        axios
            .post(`${API_URL}/login`, credential)
            .then((resp) => {
                console.log(resp.data);
                setSubmit(false);
                dispatch({
                    type: "SUCCESS",
                    access_token: resp.data.access_token,
                    user: resp.data.user,
                });
                props.history.push("/dashboard");

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
                            error[key] = error[key]['isNotEmpty'];
                            console.log(error[key]['isNotEmpty']);
                        });
                        setErrors(error);
                    }
                    setErrorMsg(data.message);
                }
            });
    };
    if (logins.isLogin) {
        return <Redirect to="/dashboard" />
    }
    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="#" className="h1"><b>Medical</b>Device</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        {errorMsg ? errorMsg : ''}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input
                                        name="email"
                                        onChange={handleChange}
                                        className={`form-control ${isError ? "is-invalid" : ""}`}
                                        type="email"
                                        placeholder="Email"
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                    <span className="error invalid-feedback text-capitalize">{errors.email}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input
                                        name="password"
                                        onChange={handleChange}
                                        className={`form-control ${isError ? "is-invalid" : ""}`}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                    <span className="error invalid-feedback text-capitalize">{errors.password}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-right">
                                    <button type="submit" disabled={submit ? true : false} className="btn btn-outline-primary">
                                        {submit ? <i className="fa fa-spinner fa-spin mr-1"></i> : ""}
                                        Sign In
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

export default Login

