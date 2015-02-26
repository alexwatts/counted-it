/** @jsx React.DOM */
var React = require('react');

var Footer =
    React.createClass({
        render:function() {
            return <div>
                <a href="https://cloud.google.com/"><img src="powered-by-gcp.png"></img></a>
            </div>
        }
    });

module.exports = Footer;