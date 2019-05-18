import React, {Component} from 'react';

export default class Register extends Component {
    render() {
        return (
            <form method="POST" onSubmit={this.props.onSubmitForm} className="mt-4">

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="Enter your name" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="text" name="email" id="email" className="form-control" placeholder="Enter email" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="form-control"
                           aria-describedby="password"
                           placeholder="Enter password" required/>
                    <small id="emailHelp" className="form-text text-muted">Password should include 6 symbols
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="password_confirmation">Password confirm</label>
                    <input type="password" name="password_confirmation" id="password_confirmation"
                           className="form-control"
                           aria-describedby="password_confirmation"
                           placeholder="Password confirmation" required/>
                    <small id="password_confirmation" className="form-text text-muted">Password should include 6 symbols
                    </small>
                </div>

                <button type="submit" className="btn btn-primary btn-center">Submit</button>

            </form>
        );
    }
}