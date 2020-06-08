import React from 'react'

export const UploadFilesButton = props => {
    return(
        props.files && (
           <>
               <label className="add-files" id="upload"
                      onClick={e => props.onUpload(e)}>
                   <i className="fas fa-upload"/>
               </label>
               <label className="add-files" id="upload"
                      onClick={e => props.onUpload(e, 'compress')}>
                   <i className="fas fa-compress"/>
               </label>
           </>
        ) || (<></>)
    );
};
