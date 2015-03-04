/** @jsx React.DOM */
var React = require('react');

var Footer =
    React.createClass({
        render:function() {
            return <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="container">
                        <a href="https://cloud.google.com/"><img className="footer" src="powered-by-gcp.png"></img></a>
                    </div>
                </nav>

        }
    });

module.exports = Footer;