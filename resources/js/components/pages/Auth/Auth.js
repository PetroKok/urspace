import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import api from "../../helpers/api_urls";
import routes from "../../helpers/routes_urls";
import * as _ from "lodash";

import {AuthRoute} from "../../common/AuthRoute";
import {Loader} from "../../common/Loader";
import Modal from "../../common/Modal";
import {NotificationContainer, NotificationManager} from "react-notifications";

export default class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            showModal: false,
            errors: null,
            arr: [{h: 1, b: 2}]

        };
        this.onSubmitFormLogin = this.onSubmitFormLogin.bind(this);
        this.onSubmitFormRegister = this.onSubmitFormRegister.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({showModal: false})
    }

    onSubmitFormLogin(e) {
        e.preventDefault();

        this.setState({processing: true});

        let formData = new FormData(e.target);

        axios.post(api.LOGIN, formData)
            .then(res => {
                if (!res.data.error) {
                    localStorage.setItem('token', res.data.token);
                    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                    window.location = routes.PROFILE;
                    this.setState({processing: false});
                } else {
                    this.setState({processing: false});
                }
            })
            .catch(err => {
                this.setState({
                    processing: false,
                    showModal: true,
                    errors: err.response.data.errors || err.response.data.message
                });
                console.log(typeof this.state.errors)
            });
    }

    onSubmitFormRegister(e) {
        e.preventDefault();

        this.setState({processing: true});

        let formData = new FormData(e.target);

        axios.post(api.REGISTER, formData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                window.location = routes.PROFILE;
                this.setState({processing: false});
            })
            .catch(err => {
                this.setState({
                    processing: false,
                    showModal: true,
                    errors: err.response.data.errors || err.response.data.message
                });
            });
    }

    renderForm() {
        return this.state.processing
            ? (<Loader/>)
            : (
                <div className="mt-5 col-md-6 offset-md-3">

                    <div className="btn-group" role="group" aria-label="Basic example" style={{width: "100%"}}>
                        <Link className="btn btn-primary" to="/login">Login</Link>
                        <Link className="btn btn-primary" to="/register">Register</Link>
                    </div>

                    {this.state.showModal && typeof this.state.errors === "string" && (
                        <div className="alert alert-danger mt-4" role="alert">
                           {this.state.errors}
                        </div>
                    )}

                    {(
                        this.state.showModal && typeof this.state.errors === "object" && this.state.errors.length !== 0 &&
                        _.map(this.state.errors, (item, i) => (
                            <div className="alert alert-danger mt-4" key={i} role="alert">
                                {item}
                            </div>
                        ))
                    )}

                    <AuthRoute path='/login' render={() => <Login onSubmitForm={this.onSubmitFormLogin}/>}/>
                    <AuthRoute path='/register' render={() => <Register onSubmitForm={this.onSubmitFormRegister}/>}/>
                    <NotificationContainer/>
                </div>
            )
    }

    render() {
        return (
            <div className="container">
                {this.renderForm()}
            </div>
        );
    }
}
