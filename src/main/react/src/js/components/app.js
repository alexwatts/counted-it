/** @jsx React.DOM */
var React = require('react');
var Login = require('./login.js');
var Home = require('./home.js');
var Template = require('./app-template.js');
var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;

var App =
    React.createClass({
        render:function() {
            return (
                <Template>
                    <Locations>
                        <Location path="/" handler={Home}></Location>
                        <Location path="/login" handler={Login}></Location>
                    </Locations>
                </Template>
            )
        }
    });

module.exports = App;