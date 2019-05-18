import React from 'react'

export const DeleteButton = props => {
    return(
        props.data.length !== 0 &&
        (<label className="add-files add-files-right danger" id="fileFather"
                onClick={props.onDelete}>
            <i className="fas fa-trash"/>
        </label>)
    );
};