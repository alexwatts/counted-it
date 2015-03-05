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
                <p>Counted It is a new unique place where you can count the things that are happening
                in your life.</p>
                <p><Link onClick={this.handleNav.bind(null, 'CountSomething')} className="btn btn-primary btn-lg" href="/count" role="button">Start Counting</Link></p>
            </div>
        }
    });

module.exports = Home;