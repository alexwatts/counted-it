/** @jsx React.DOM */
var React = require('react');
var Login = require('./login.js');
var Home = require('./home.js');
var CountSomething = require('./count-something.js');
var MyCounts = require('./my-counts.js');
var SharedCounts = require('./shared-counts.js');
var SharedCounts = require('./my-profile.js');
var Template = require('./app-template.js');
var Router = require('react-router-component');
var API = require('../util/api.js');
var AppStore = require('../stores/app-store.js');

var Locations = Router.Locations;
var Location = Router.Location;

function profile(){
    return {profile: AppStore.getProfile()}
}

var App =
    React.createClass({
        componentDidMount:function(){
            //Initialise profile object
            API.getProfile();
        },
        componentWillMount:function(){
            //Listen for updates to the store for profile object
            AppStore.addChangeListener(this._onChange)
        },
        getInitialState:function(){
            return profile();
        },
        _onChange:function(){
            this.setState(profile())
        },
        render:function() {
            return (
                <Template profile={this.state.profile}>
                    <Locations>
                        <Location path="/" handler={Home}></Location>
                        <Location path="/count" handler={CountSomething}></Location>
                        <Location path="/my-counts" handler={MyCounts}></Location>
                        <Location path="/shared-counts" handler={SharedCounts}></Location>
                        <Location path="/my-profile" handler={MyProfile}></Location>
                    </Locations>
                </Template>
            )
        }
    });

module.exports = App;