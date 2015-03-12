/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router-component').Link;
var AppActions = require('../../actions/app-actions.js');

var Header =
    React.createClass({
        handleNav: function (clickedNav) {
            AppActions.updatePage(clickedNav);
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
                            <a className={(this.props.page == 'Home') ? "navbar-brand active" : "navbar-brand"} href="/" onClick={this.handleNav.bind(null, 'Home')}>Counted It</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className={(this.props.page == 'CountSomething') ? "active" : ""}><Link onClick={this.handleNav.bind(null, 'CountSomething')} href="/count">Count Something</Link></li>
                                <li className={(this.props.page == 'MyCounts') ? "active" : ""}><Link href="/my-counts" onClick={this.handleNav.bind(null, 'MyCounts')}>My Counts</Link></li>
                                <li className={(this.props.page == 'SharedCounts') ? "active" : ""}><Link href="/shared-counts" onClick={this.handleNav.bind(null, 'SharedCounts')}>Shared Counts</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.props.profile.profile.displayName}<span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
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