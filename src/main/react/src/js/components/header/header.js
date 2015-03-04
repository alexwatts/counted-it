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
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#counted—it-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">Counted It</a>
                                </div>
                                    <div className="collapse navbar-collapse" id="counted-it-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#"></a>{this.state.profile.profile.displayName}</li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                        <li className="divider"></li>
                                        <li><a href="#">Separated link</a></li>
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