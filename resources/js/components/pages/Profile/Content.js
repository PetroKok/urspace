import React from 'react';
import Nav from "./Nav";

export const Content = (props) => (
    <div id="content">
        <Nav/>
        {props.children}
    </div>
);