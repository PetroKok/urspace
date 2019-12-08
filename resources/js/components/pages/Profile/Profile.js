import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {ProfileLayout} from "../../layouts/ProfileLayout";
import {SideBar} from "./comps/SideBar";
import {Content} from "./Content";
import Profile_Home from './pages/Profile_Home'
import Profile_Access_Files from './pages/Profile_Access_Files'


import Settings from "./settings/Settings";
import FileLoader from "./fileLoader/FileLoader";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <ProfileLayout>
                <SideBar/>
                <Content>
                    <Switch>
                        <Route path="/profile" exact component={Profile_Home}/>
                        <Route path="/profile/file-access" exact component={Profile_Access_Files}/>
                        <Route path="/profile/settings" component={Settings}/>
                    </Switch>
                </Content>
            </ProfileLayout>
        );
    }
}

export default Home;