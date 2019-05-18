import React, {Component} from 'react';

export default class Login extends Component{
    render(){
        return(
            <form method="POST" onSubmit={this.props.onSubmitForm} className="mt-4">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="text" name="email" id="email" className="form-control" aria-describedby="emailHelp"
                           placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.
                        </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary btn-center">Submit</button>
            </form>
        );
    }
}