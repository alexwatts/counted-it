/** @jsx React.DOM */
var React = require('react');

var CountSomething =
    React.createClass({
        render:function() {
            return <div class="page-header">
                <h1>Count Something <small>type of thing to count</small></h1>
            </div>
        }
    });

module.exports = CountSomething;