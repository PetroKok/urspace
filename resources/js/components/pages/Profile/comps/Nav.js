import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../../../common/axios'
import api from '../../../helpers/api_urls'
import routes from '../../../helpers/routes_urls'
import ModalLoader from "../../../common/ModalLoader";

export default class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
       if (this.state.processing !== true){
           this.setState({processing : true})
           axios().post(api.LOGOUT)
               .then(res => {
                   if (res.data.code === 200) {
                       localStorage.removeItem('token');
                       window.location = routes.LOGIN;
                   }
               })
               .catch(err => alert(err))
       }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    {this.state.processing && <ModalLoader/>}

                    <button type="button" id="sidebarCollapse" className="btn btn-info">
                        <i className="fas fa-align-left"/>
                    </button>

                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile/settings">Settings</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link a-logout" onClick={this.logout}>Logout</button>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        );
    }
}