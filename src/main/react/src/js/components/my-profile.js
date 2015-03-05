/** @jsx React.DOM */
var React = require('react');

var MyProfile =
    React.createClass({
        render:function() {
            return <div class="page-header">
                <h1>My Profile <small>details of your account</small></h1>
            </div>
        }
    });

module.exports = MyProfile;