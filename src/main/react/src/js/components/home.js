/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router-component').Link;
var AppActions = require('../actions/app-actions.js');

var Home =
    React.createClass({
        handleNav: function (clickedNav) {
            AppActions.updatePage(clickedNav);
        },
        render:function() {
            return <div className="jumbotron">
                <h1>Welcome to Counted It!</h1>
                <p>Counted It is a simple concept! Create a count to track something. Then you can generate a graph of whatever you've counted and share it. You could track weight loss for example, but it really could be anything!</p>
                <p><Link onClick={this.handleNav.bind(null, 'CountSomething')} className="btn btn-primary btn-lg" href="/count" role="button">Start Counting</Link></p>
            </div>
        }
    });

module.exports = Home;