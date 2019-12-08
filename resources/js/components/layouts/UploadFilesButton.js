import React from 'react'

export const UploadFilesButton = props => {
    return(
        props.files && (
            <label className="add-files" id="upload"
                   onClick={e => props.onUpload(e)}>
                <i className="fas fa-upload"/>
            </label>
        ) || (<span></span>)
    );
};
