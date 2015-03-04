/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');

function profile(){
    return {profile: AppStore.getProfile()}
}

var Header =
    React.createClass({
        getInitialState:function(){
            return profile();
        },
        componentWillMount:function(){
            AppStore.addChangeListener(this._onChange)
        },
        _onChange:function(){
            this.setState(profile())
        },
        render:function() {
            return <div className="row">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Counted It</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="#">Count Something <span className="sr-only">(current)</span></a></li>
                                <li><a href="#">My Counts</a></li>
                                <li><a href="#">Shared Counts</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.state.profile.profile.displayName}<span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#">Profile</a></li>
                                        <li className="divider"></li>
                                        <li><a href="/logout">Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </nav>
            </div>
        }
    });

module.exports = Header;