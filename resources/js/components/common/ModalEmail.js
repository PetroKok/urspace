import React from 'react'
import ReactDOM from 'react-dom'

export default class ModalLoader extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: ''
        };
    }

    componentWillMount() {
        this.root = document.createElement('div');
        document.body.appendChild(this.root);
    }

    componentWillUnmount() {
        document.body.removeChild(this.root);
    }

    render() {
        return ReactDOM.createPortal(
            <div>
                <div className="global-alert" role="alert" onClick={this.props.close}>
                </div>
                <div className="modal-email-window row">
                    <input type="text" onChange={e => this.setState({email: e.target.value})} value={this.state.email}/>
                    <button className="btn btn-primary" onClick={() => this.props.click(this.state.email)}>Send</button>
                </div>
            </div>
            ,
            this.root
        );
    }
}