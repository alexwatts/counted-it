/** @jsx React.DOM */
var React = require('react');

var Footer =
    React.createClass({
        render:function() {
            return <nav className="navbar navbar-default navbar">
                    <div className="container">
                        <a href="https://cloud.google.com/"><img className="footer" src="powered-by-gcp.png"></img></a>
                        <a className="pull-right" href="http://facebook.github.io/react/"><img className="footer" src="react_flux.png"></img></a>
                    </div>
                </nav>

        }
    });

module.exports = Footer;