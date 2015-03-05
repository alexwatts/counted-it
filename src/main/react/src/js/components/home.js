/** @jsx React.DOM */
var React = require('react');

var Home =
    React.createClass({
        render:function() {
            return <div className="jumbotron">
                <h1>Welcome to Counted It!</h1>
                <p>Counted It is a new unique place where you can count the things that are happening
                in your life.</p>
                <p><a className="btn btn-primary btn-lg" href="/count" role="button">Start Counting</a></p>
            </div>
        }
    });

module.exports = Home;