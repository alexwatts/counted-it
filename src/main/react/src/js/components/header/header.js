/** @jsx React.DOM */
var React = require('react');

var Header =
    React.createClass({
        render:function() {
            return <div>
                <a href ="login.html"
                    className="btn btn-success">
                    Login
                </a>
            </div>
        }
    });

module.exports = Header;