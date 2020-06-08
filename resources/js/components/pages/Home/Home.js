import React, {Component} from 'react'

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bgimg">
                <div className="topleft">
                    <p>Logo</p>
                </div>
                <div className="topright">
                    <a href="/profile">Profile</a>
                </div>
                <div className="middle">
                    <h1>COMING SOON</h1>
                    <hr id="hr"/>
                </div>
                <div className="bottomleft">
                    <p>Some text</p>
                </div>
            </div>
        );
    }
}

export default Home;
