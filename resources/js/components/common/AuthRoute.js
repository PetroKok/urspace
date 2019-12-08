import React from "react";
import {Redirect, Route} from "react-router-dom"

export const AuthRoute = ({renn: Component, ...rest}) => {
    return localStorage.getItem('token')
        ? <Redirect to={{
            pathname: "/"
        }}/>
        : <Route {...rest}/>
};