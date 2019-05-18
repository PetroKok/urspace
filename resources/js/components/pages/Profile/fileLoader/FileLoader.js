import React from 'react';
import axios from "../../../common/axios";
import api_urls from "../../../helpers/api_urls";
import ListFiles from "./ListFiles";
import _ from 'lodash';
import ModalLoader from "../../../common/ModalLoader";

import {Loader} from "../../../common/Loader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {DeleteButton} from "../../../layouts/DeleteButton";
import {EmailButton} from "../../../layouts/EmailButton";
import {AddFilesButton} from "../../../layouts/AddFilesButton";
import {UploadFilesButton} from "../../../layouts/UploadFilesButton";
import {AccessButton} from "../../../layouts/AccessButton";


import 'react-notifications/lib/notifications.css';

export default class FileLoader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: null,
            items: null,
            processing: false,
            btn: false,
            checked_items: []
        };
        this.getFiles = this.getFiles.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.accessFiles = this.accessFiles.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.deleteFiles = this.deleteFiles.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendEmailFiles = this.sendEmailFiles.bind(this);
        this.onCheckInput = this.onCheckInput.bind(this);
    }


    sendEmailFiles() {

        let files = this.state.checked_items;

        this.setState({checked_items: []});
        $('input[type="checkbox"]').prop('checked', false);

        let data = new FormData();

        files.map((file) => {
            data.append('files[]', file);
        });
        axios().post(api_urls.FILES_SEND_EMAIL, data)
            .then(res => {

                this.setState({processing: false, checked_items: []});

                NotificationManager.success('Success message', res.data.message, 7000);

            })
            .catch(err => console.log(err))
    }


    downloadFile(file) {

    }

    accessFiles() {
    }

    onCheckInput(arr) {
        let data = this.state.checked_items;
        let n = _.remove(data, (e) => {
            return e === arr;
        });

        this.setState({checked_items: data});

        if (n.length === 0) {
            data.push(arr);
            this.setState({checked_items: data})
        }
        console.log(this.state.checked_items);
    }

    deleteFiles() {
        this.deleteFile(this.state.checked_items);
    }

    deleteFile(file) {
        if (Array.isArray(file)) {
            this.setState({processing: true});
            let data = new FormData();
            file.map((f) => {
                data.append('files[]', f);
            });
            axios().post(api_urls.FILES_DELETE, data)
                .then(res => {
                    file.map((f) => {
                        _.remove(this.state.items, {
                            id: f
                        });
                    });
                    $('input[type="checkbox"]').prop('checked', false);
                    this.setState({processing: false, checked_items: []});
                    NotificationManager.success('Success message', res.data.message, 5000);
                })
                .catch(err => {
                    console.log(err);
                    this.setState({processing: false});
                })
        } else {
            this.setState({processing: true});
            axios().delete(api_urls.FILE_DELETE_ID + file.id)
                .then(res => {
                    _.remove(this.state.items, {
                        id: file.id
                    });
                    this.setState({processing: false});
                    NotificationManager.success('Success message', res.data.message, 5000);
                })
                .catch(err => {
                    console.log(err);
                    this.setState({processing: false});
                })
        }
    }

    componentDidMount() {
        axios().post(api_urls.FILES)
            .then(res => {
                this.setState({items: res.data})
            })
            .catch(err => console.log(err))
    }

    getFiles(e) {
        this.setState({files: Array.from(e.target.files)});
    }

    uploadFiles(e) {
        e.preventDefault();

        let files = this.state.files;

        if (this.state.files && files.length !== 0) {
            this.setState({processing: true});
            this.setState({btn: true}, () => console.log());
            let data = new FormData();
            files.map((file, key) => {
                data.append('files[]', file);
            });
            axios().post(api_urls.FILES_UPLOAD, data)
                .then(res => {
                    if (res.data.files.length >= 1) {
                        let items = res.data.files;
                        $('input[type="checkbox"]').prop('checked', false);
                        this.setState({
                            items: _.unionBy(items, this.state.items, "id"),
                            btn: false,
                            processing: false,
                            files: null
                        });
                        NotificationManager.success('Success message', 'Uploaded files', 5000);
                    } else {
                        this.setState({btn: false, processing: false});
                        NotificationManager.error('Error message', 'HERE IS NOT FILES IN RESPONSE!', 5000);
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({btn: false, processing: false});
                });
            e.target.value = null;
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <form>
                                <div className="form-group files color">
                                    <AddFilesButton getFiles={this.getFiles}/>
                                    <UploadFilesButton files={this.state.files} onUpload={this.uploadFiles}/>

                                    {/* float right */}
                                    <DeleteButton data={this.state.checked_items} onDelete={this.deleteFiles}/>
                                    <EmailButton data={this.state.checked_items} onEmail={this.sendEmailFiles}/>
                                    <AccessButton data={this.state.checked_items} onAccess={this.accessFiles}/>



                                </div>
                            </form>
                        </div>
                    </div>
                    {this.state.processing && <ModalLoader/>}
                    {this.state.items &&
                    <ListFiles files={this.state.items} delete={this.deleteFile} download={this.downloadFile} onCheck={this.onCheckInput}/> ||
                    <Loader/>}
                </div>
                <NotificationContainer/>

            </div>
        );
    }
}