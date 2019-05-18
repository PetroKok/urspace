import React from 'react'

export const AddFilesButton = props => {
    return (
        <label htmlFor="store" className="add-files" id="fileFather">
            <i className="fas fa-plus"/>
            <input type="file" name="files[]" id="store" className="form-control-file"
                   multiple={true}
                   onChange={e => props.getFiles(e)} style={{display: 'none'}}/>
        </label>

    );
};