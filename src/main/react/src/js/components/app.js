/** @jsx React.DOM */
var React = require('react');
var Login = require('./login.js');
var Home = require('./home.js');
var CountSomething = require('./count-something.js');
var MyCounts = require('./my-counts.js');
var SharedCounts = require('./shared-counts.js');
var MyProfile = require('./my-profile.js');
var Template = require('./app-template.js');
var Router = require('react-router-component');
var API = require('../util/api.js');
var AppStore = require('../stores/app-store.js');
var CountStore = require('../stores/count-store.js');
var PageStore = require('../stores/page-store.js');
var merge  = require('react/lib/merge');


var Locations = Router.Locations;
var Location = Router.Location;

function profile(){
    return {profile: AppStore.getProfile()}
}
function myCounts(){
    return {myCounts: CountStore.getMyCounts()}
}
function page(){
    return {page: PageStore.getPage()}
}

var App =
    React.createClass({
        componentDidMount:function(){
            //Initialise store objects
            API.getProfile();
            API.getMyCounts();
        },
        componentWillMount:function(){
            //Listen for updates from the stores
            AppStore.addChangeListener(this._onProfileChange);
            CountStore.addChangeListener(this._onCountsChange)
            PageStore.addChangeListener(this._onPageChange)
        },
        getInitialState:function(){
            return merge(profile(), myCounts(), page());
        },
        _onProfileChange:function(){
            this.setState(profile())
        },
        _onCountsChange:function(){
            this.setState(myCounts())
        },
        _onPageChange:function(){
            this.setState(page())
        },
        render:function() {
            return (
                <Template profile={this.state.profile} page={this.state.page}>
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