import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import api from "../../helpers/api_urls";
import routes from "../../helpers/routes_urls";

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
            errors: [],
            arr: [{h:1,b:2}]

        };
        this.onSubmitFormLogin = this.onSubmitFormLogin.bind(this);
        this.onSubmitFormRegister = this.onSubmitFormRegister.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.setState({showModal: false})
    }

    onSubmitFormLogin(e) {
        e.preventDefault();

        this.setState({processing: true});

        let formData = new FormData(e.target);

        axios.post(api.LOGIN, formData)
            .then(res => {
                if(!res.data.error){
                    localStorage.setItem('token', res.data.token);
                    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                    window.location = routes.PROFILE;
                    this.setState({processing: false});
                } else{
                    this.setState({processing: false});
                }
            })
            .catch(err => {
                this.setState({processing: false});
                NotificationManager.error('Error message', 'Some error on server side', 5000);
                console.log(err);
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
                NotificationManager.error('Error message', err, 5000);
                this.setState({processing: false});
                console.log(err);
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

                    {this.state.showModal && this.state.errors &&
                        <Modal onClose={this.closeModal} data={this.state.arr}>
                            <h2>TEXT</h2>
                        </Modal>
                    }

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