import React from 'react';
import Nav from "./comps/Nav";

export const Content = (props) => (
    <div id="content">
        <Nav/>
        {props.children}
    </div>
);