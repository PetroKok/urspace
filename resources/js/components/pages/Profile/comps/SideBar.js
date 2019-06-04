import React from 'react';
import {Link} from 'react-router-dom';
import routes_urls from "../../../helpers/routes_urls";

export const SideBar = () => (
    <nav id="sidebar">
        <div className="sidebar-header">
            <h3>URspace</h3>
            <strong>URs</strong>
        </div>

        <ul className="list-unstyled components">
            <li className="active">
                <Link to={routes_urls.PROFILE}>
                    <i className="fas fa-folder-open"/>
                    My files
                </Link>
            </li>
            <li className="active">
                <Link to={'/profile/file-access'}>
                    <i className="fas fa-user-lock"/>
                    File access
                </Link>
            </li>
            <li>
                <a href="#files" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                    <i className="fas fa-folder"/>
                    Files
                </a>
                <ul className="collapse list-unstyled" id="files">
                    <li>
                        <a href="#">Images</a>
                    </li>
                </ul>
            </li>
        </ul>

        <ul className="list-unstyled CTAs">
            <li>
                {/*<a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</a>*/}
            </li>
            <li>
                {/*<a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a>*/}
            </li>
        </ul>
    </nav>
);