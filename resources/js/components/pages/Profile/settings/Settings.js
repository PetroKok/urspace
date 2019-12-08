import React, {Component} from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import api_urls from "../../../helpers/api_urls";
import axios from '../../../common/axios';
import {Loader} from "../../../common/Loader";
import ModalLoader from "../../../common/ModalLoader";
import Modal from "../../../common/Modal";
import 'react-notifications/lib/notifications.css';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            processing: false,
        };
        this.onSubmitForm = this.onSubmitForm.bind(this);

    }

    componentDidMount() {

        axios().post(api_urls.USER_WITH_API)
            .then(res => {
                this.setState({user: res.data});
            })
            .catch(err => {
                alert(err);
                console.log(err)
            })
    }

    onUserChange(key, e) {
        let data = e.target.value;
        let user = this.state.user;
        user[key] = data;
        this.setState({user: user})
    }

    onSubmitForm(e) {
        e.preventDefault();

        this.setState({processing: true});

        let formData = new FormData(e.target);

        axios().post(api_urls.PROFILE_UPDATE + `/${this.state.user.id}`, formData)
            .then(res => {
                this.setState({
                    user: res.data.user,
                    processing: false,
                    message: res.data.message
                });
                NotificationManager.success('Success message', 'Title here', 5000);
            })
            .catch(err => {
                console.log(err);
                this.setState({processing: false});
            })
    }

    render() {
        return this.state.user.length !== 0 ? (
            <form method="POST" onSubmit={this.onSubmitForm} className="col-md-8">

                {this.state.processing && <ModalLoader/>}


                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="Enter your name"
                           value={this.state.user.name} required onChange={(e) => this.onUserChange('name', e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="text" name="email" id="email" className="form-control" placeholder="Enter email"
                           value={this.state.user.email} required onChange={(e) => this.onUserChange('email', e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="secret_key">Secret key</label>
                    <input type="text" id="secret_key" className="form-control" placeholder="Your api secret key"
                           value={this.state.user.access_api[0].token} onChange={(e) => this.onUserChange('secret_key', e)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-center">Submit</button>
                <NotificationContainer/>

            </form>

        ) : <Loader/>;
    };
}

export default Settings;