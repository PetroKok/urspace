import React from 'react'
import PreviewFile from "../../../common/PreviewFile";


export default class ListFiles extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="list-group">
                {
                    this.props.files.map((file, key) => (
                        <div key={key} className="list-group-item list-group-item-action">
                            <div className="line-border">
                                <label className="block-checkbox">
                                    <input type="checkbox" onChange={() => this.props.onCheck(file.id)}/>
                                    <span className="checkmark"/>
                                </label>

                                <PreviewFile file={file}/>

                                <div className="dropdown mr-1 float-right dropleft">
                                    <button type="button" className="btn btn-padding-unset btn-success" id={key} data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false" data-offset="10,20">
                                        <i className="fas fa-angle-double-left"/>
                                    </button>
                                    <div className="dropdown-menu cursor-pointer" aria-labelledby={key}>
                                        <li className="dropdown-item">Get access for...</li>
                                        <li className="dropdown-item">Send as Email...</li>
                                        <li className="dropdown-item" onClick={() => this.props.download(file)}>Download</li>
                                        <li className="dropdown-item" onClick={() => this.props.delete(file)}>Delete</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {this.props.files.length === 0 ? <p>Upload your files!</p> : null}
            </div>
        );
    }
}