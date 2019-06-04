import React from 'react';
import axios from "../../../common/axios";
import api_urls from "../../../helpers/api_urls";
import FileLoader from '../fileLoader/FileLoader'

export default class Profile_Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
            title: "My files"
        }
    }

    componentDidMount(){
        axios().post(api_urls.FILES)
            .then(res => {
                this.setState({items: res.data})
            })
            .catch(err => console.log(err))
    }

    render(){
        return(
            <FileLoader files={this.state.items} title={this.state.title}/>
        );
    }
}