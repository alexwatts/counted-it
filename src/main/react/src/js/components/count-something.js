/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router-component').Link;
var API = require('../util/api.js');
var AppActions = require('../actions/app-actions.js');
var NavigatableMixin = require('react-router-component').NavigatableMixin;

var CountSomething =
    React.createClass({

        mixins:[NavigatableMixin],

        getInitialState: function () {
            return {
                countType: '',
                countText: ''
            }
        },
        handleChange: function (name, e) {
            var change = {};
            change[name] = e.target.value;
            this.setState(change);
        },
        handleClick: function (name, e) {

            var change = {};
            change[name] = e.target.text;
            this.setState(change);
        },
        handleCreate: function (item, e) {
            var that = this;
            e.preventDefault();
            API.createCount(this.state.countType, this.state.countText, this.navigate, this)
        },

        render:function() {

            return  <div>
                        <h1> Create a new count</h1>
                        <div className="alert alert-warning" role="alert">Select a Count type using the Type arrow button, then enter a Name for your count eg. Weight Loss. When you've finished you can click Create Count</div>
                        <div className="row">
                            <div className="col-md-12 col-xs-12">
                                <div className="input-group">
                                    <span className="input-group-addon minw70">Type</span>
                                    <input disabled type="text" className="form-control" aria-label="" value={this.state.countType}/>
                                    <div className="input-group-btn">
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">&nbsp;<span className="caret"></span></button>
                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <li><a value={this.state.countType} onClick={this.handleClick.bind(this, 'countType')}>Numeric over Time</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row top7">
                            <div className="col-md-12 col-xs-12">
                                <div className="input-group">
                                    <span className="input-group-addon minw70">Name</span>
                                    <input type="text" className="form-control" aria-label="" value={this.state.countText} onChange={this.handleChange.bind(this, 'countText')}/>
                                </div>
                            </div>
                        </div>
                        <div className="row top7">
                            <div className="col-md-12 col-xs-12">
                                <Link onClick={this.handleCreate.bind(null, this)} className={this.state.countText && this.state.countType ? "btn btn-primary minw200" : "btn btn-primary minw200 hide" } href="/my-counts" role="button">Create Count</Link>
                            </div>
                        </div>
                    </div>

        }
    });

module.exports = CountSomething;