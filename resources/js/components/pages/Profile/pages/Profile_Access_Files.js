import React from 'react';
import axios from "../../../common/axios";
import api_urls from "../../../helpers/api_urls";
import FileLoader from '../fileLoader/FileLoader'
import auth_refresh from "../../../helpers/auth_refresh";
// sdf
export default class Profile_Access_Files extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: null,
            arr: null,
            title: "Shared other users"
        }
    }

    componentDidMount(){
        axios().post(api_urls.FILES_ACCESS)
            .then(res => {
                this.setState({items: res.data.data}, () => {
                    console.log(this.state.items);
                })
            })
            .catch(err => {
                console.log(123123)
                auth_refresh(err);
            })
    }

    render(){
        return(
            <FileLoader files={this.state.items} title={this.state.title} accessed={true}/>
        );
    }
}
