import React from 'react'
import ReactDOM from 'react-dom'

export default class ModalLoader extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            date: '',
            disabled: true
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
        const {email, date} = this.state;
        return ReactDOM.createPortal(
            <div>
                <div className="global-alert" role="alert" onClick={this.props.close}>
                </div>
                <div className="modal-email-window row">
                    <label className="label-info">Emails:</label>
                    <input type="text" id="text" onChange={e => this.setState({email: e.target.value})} value={this.state.email}/>
                    <label className="label-info">Access to date:</label>
                    <input type="date" id="date" onChange={e => this.setState({date: e.target.value})} value={this.state.date}/>
                    <button className="btn btn-primary w-100" onClick={() => this.props.click(this.state.email, this.state.date)} disabled={email.length !== 0 && date.length !== 0 ? false : true}>Send</button>
                </div>
            </div>
            ,
            this.root
        );
    }
}