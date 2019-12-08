import React from 'react'

export const EmailButton = props => {
    return(
        props.data.length !== 0 &&
        (<label className="add-files add-files-right primary" id="email-button"
                onClick={props.onEmail}>
            <i className="fas fa-paper-plane"/>
        </label>)
    );
};