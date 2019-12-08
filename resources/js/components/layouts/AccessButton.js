import React from 'react'

export const AccessButton = props => {
    return(
        props.data.length !== 0 &&
        (<label className="add-files add-files-right access" id="fileFather"
                onClick={props.onAccess}>
            <i className="fas fa-unlock-alt"/>
        </label>)
    );
};