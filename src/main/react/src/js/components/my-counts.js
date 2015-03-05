/** @jsx React.DOM */
var React = require('react');

var MyCounts =
    React.createClass({
        render:function() {
            return <div class="page-header">
                <h1>My Counts <small>things I am counting</small></h1>
            </div>
        }
    });

module.exports = MyCounts;