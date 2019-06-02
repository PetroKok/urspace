import React, {Component} from 'react';
import FileViewer from "react-file-viewer";
import routes_urls from "../helpers/routes_urls";

export default class FileViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            file: []
        };
        this.showFile = this.showFile.bind(this);
    }

    showFile() {
        this.setState({show: !this.state.show});
    }

    render() {
        const {file} = this.props;
        let fileType = file.src.split('.')[1];
        return (
            <span key={this.props.file.id}>
                <span key={file.id}>
                    {this.state.show && (
                        <div className="modal-preview-file" key={file.id}>
                            <div className="fade-wall" key={file.id} onClick={this.showFile}/>
                            <FileViewer
                                fileType={fileType}
                                filePath={routes_urls.IMAGE + file.src}
                                errorComponent={(err) => console.log(err)}
                                onError={(err) => console.log(err)}/>
                        </div>
                    )}
                </span>
                <i className={`fas  custom-fa ${this.props.icon}`}/>
                <a href="#" onClick={this.showFile} className="ml-3">{file.name}</a>
            </span>
        );
    }
}