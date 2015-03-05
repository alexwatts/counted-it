/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router-component').Link;

var Header =
    React.createClass({
        getInitialState: function () {
            return {
                activeNav: 'Home'
            }
        },
        handleNav: function (clickedNav) {
            this.setState({
                activeNav: clickedNav
            });
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
                            <a className={(this.state.activeNav == 'Home') ? "navbar-brand active" : "navbar-brand"} href="/" onClick={this.handleNav.bind(null, 'Home')}>Counted It</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className={(this.state.activeNav == 'CountSomething') ? "active" : ""}><Link onClick={this.handleNav.bind(null, 'CountSomething')} href="/count">Count Something</Link></li>
                                <li className={(this.state.activeNav == 'MyCounts') ? "active" : ""}><Link href="/my-counts" onClick={this.handleNav.bind(null, 'MyCounts')}>My Counts</Link></li>
                                <li className={(this.state.activeNav == 'SharedCounts') ? "active" : ""}><Link href="/shared-counts" onClick={this.handleNav.bind(null, 'SharedCounts')}>Shared Counts</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.props.profile.profile.displayName}<span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><Link href="/my-profile">Profile</Link></li>
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