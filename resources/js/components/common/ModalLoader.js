import React from 'react'
import ReactDOM from 'react-dom'

export default class ModalLoader extends React.Component{

    componentWillMount() {
        this.root = document.createElement('div');
        document.body.appendChild(this.root);
    }

    componentWillUnmount() {
        // document.body.removeChild(this.root);
    }

    render() {
        return ReactDOM.createPortal(
            <div className="global-alert" role="alert"/>,
            this.root
        );
    }
}