import React from 'react';
import axios from "../../../common/axios";
import api_urls from "../../../helpers/api_urls";
import ListFiles from "./ListFiles";
import _ from 'lodash';
import ModalLoader from "../../../common/ModalLoader";
import ModalEmail from "../../../common/ModalEmail";
import ModalAccess from "../../../common/ModalAccess";

import {Loader} from "../../../common/Loader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {DeleteButton} from "../../../layouts/DeleteButton";
import {EmailButton} from "../../../layouts/EmailButton";
import {AddFilesButton} from "../../../layouts/AddFilesButton";
import {UploadFilesButton} from "../../../layouts/UploadFilesButton";
import {AccessButton} from "../../../layouts/AccessButton";

// sdf
import 'react-notifications/lib/notifications.css';
import auth_refresh from "../../../helpers/auth_refresh";

export default class FileLoader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: null,
            items: null,
            processing: false,
            emailModal: false,
            accessModal: false,
            btn: false,
            checked_items: []
        };

        this.getFiles = this.getFiles.bind(this);
        this.openEmailModal = this.openEmailModal.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.sendAccessFiles = this.sendAccessFiles.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.deleteFiles = this.deleteFiles.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendEmailFiles = this.sendEmailFiles.bind(this);
        this.closeEmailModal = this.closeEmailModal.bind(this);
        this.onCheckInput = this.onCheckInput.bind(this);
        this.sendOneFile = this.sendOneFile.bind(this);
        this.accessOneFile = this.accessOneFile.bind(this);
        this.accessMoreFile = this.accessMoreFile.bind(this);
    }


    componentWillReceiveProps(props){
        if(this.state.items === null){
            console.log(props.files);
            this.setState({items: props.files})
        }
    }

    openEmailModal() {
        this.setState({emailModal: true});
    }

    closeEmailModal() {
        this.setState({emailModal: false})
        this.setState({accessModal: false})
    }

    sendOneFile(file) {
        this.setState({checked_items: [file.id]});
        this.setState({emailModal: true});
    }

    accessOneFile(file) {
        this.setState({checked_items: [file.id]});
        this.setState({accessModal: true})
    }

    accessMoreFile(file) {
        this.setState({accessModal: true})
    }

    sendAccessFiles(email, date) {
        let files = this.state.checked_items;

        this.setState({accessModal: false});

        NotificationManager.info('Info message', "Files prepearing to get access for " + email, 5000);

        console.log(files);

        $('input[type="checkbox"]').prop('checked', false);

        let data = new FormData();
        data.append('email', email);
        data.append('time_to', date);
        files.map((file) => {
            data.append('files[]', file);
        });

        this.setState({checked_items: []});

        axios().post(api_urls.FILES_SET_ACCESS, data)
            .then(res => {
                NotificationManager.success('Success message', res.data.message, 7000);
            })
            .catch(err => {
                auth_refresh(err);
            })
    }

    sendEmailFiles(email) {
        let files = this.state.checked_items;

        console.log(files);

        this.setState({checked_items: [], emailModal: false});
        NotificationManager.info('Info message', "Files prepearing to send to " + email, 5000);

        $('input[type="checkbox"]').prop('checked', false);

        let data = new FormData();
        data.append('email', email);
        files.map((file) => {
            data.append('files[]', file);
        });

        this.setState({checked_items: []});
        axios().post(api_urls.FILES_SEND_EMAIL, data)
            .then(res => {
                this.setState({processing: false, checked_items: []});
                NotificationManager.success('Success message', res.data.message, 7000);
            })
            .catch(err => {
                auth_refresh(err);
            })
    }

    downloadFile(file) {
        window.open(window.location.origin + api_urls.FILES_DOWNLOAD + file.name);
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
                    auth_refresh(err);
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
                    auth_refresh(err);
                    this.setState({processing: false});
                })
        }
    }

    getFiles(e) {
        this.setState({files: Array.from(e.target.files)});
    }

    uploadFiles(e, type = null) {
        e.preventDefault();

        let files = this.state.files;

        if (files && files.length !== 0) {
            this.setState({btn: true, processing: true});
            let data = new FormData();
            data.append('type', type);
            files.map((file, key) => {
                data.append('files[]', file);
            });
            axios().post(api_urls.FILES_UPLOAD, data)
                .then(res => {
                    if (res.data.files.length >= 1) {
                        let items = res.data.files;
                        $('input[type="checkbox"]').prop('checked', false);
                        const resultDataItems = _.unionBy(items, this.state.items, "id");
                        this.setState({
                            items: resultDataItems,
                        });
                        NotificationManager.success('Success message', 'Uploaded files', 5000);
                    } else {
                        NotificationManager.error('Error message', 'HERE IS NOT FILES IN RESPONSE!', 5000);
                    }
                    this.setState({
                        btn: false,
                        processing: false,
                        files: null
                    });
                })
                .catch(err => {
                    console.log('error in catch');
                    console.log(err);
                    auth_refresh(err);
                    this.setState({
                        btn: false,
                        processing: false,
                        files: null
                    });
                });

            e.target.value = {};
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
                                    {this.props.accessed ? null : <AddFilesButton getFiles={this.getFiles}/>}
                                    <UploadFilesButton files={this.state.files} onUpload={this.uploadFiles}/>

                                    {/* float right */}
                                    {this.props.accessed ? null : <DeleteButton data={this.state.checked_items} onDelete={this.deleteFiles}/>}
                                    <EmailButton data={this.state.checked_items} onEmail={this.openEmailModal}/>
                                    {this.props.accessed ? null : <AccessButton data={this.state.checked_items} onAccess={this.accessMoreFile}/>}

                                </div>
                            </form>
                        </div>
                    </div>
                    {this.state.processing && <ModalLoader/>}
                    {this.state.emailModal && <ModalEmail close={this.closeEmailModal} click={this.sendEmailFiles}/>}
                    {this.state.accessModal && <ModalAccess close={this.closeEmailModal} click={this.sendAccessFiles}/>}
                    {this.state.items
                    && <ListFiles accessed={this.props.accessed} files={this.state.items} delete={this.deleteFile} sendOneFile={this.sendOneFile} accessOneFile={this.accessOneFile} download={this.downloadFile} onCheck={this.onCheckInput}/>
                    || <Loader/>}

                </div>
                <NotificationContainer/>
            </div>
        );
    }
}
