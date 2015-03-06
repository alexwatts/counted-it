/** @jsx React.DOM */
var React = require('react');
var API = require('../util/api.js');
var CountStore = require('../stores/count-store.js');

function myCounts(){
    return {myCounts: CountStore.getMyCounts()}
}

var MyCounts =
    React.createClass({
        getInitialState:function(){
            return myCounts();
        },
        componentDidMount:function(){
            //Initialise store objects
            API.getMyCounts();
        },
        componentWillMount:function(){
            //Listen for updates from the stores
            CountStore.addChangeListener(this._onCountsChange)
        },
        _onCountsChange:function(){
            this.setState(myCounts())
        },
        render:function() {

            var counts = this.state.myCounts.map(function(item, i){
                return (
                    <div className="col-md-3 col-xs-3">
                        <div className="well">
                            <div className="row">
                                <a href="count/:count"><img className="count-summary" src="numeric-over-time.png"></img></a>
                            </div>
                            <div className="row">
                                <span className="label label-default">{item.countName}</span>
                            </div>
                        </div>
                    </div>
                )
            })

            return <div className="page-header">
                <h1>My Counts <small>things I am counting</small></h1>
                <div className="row">
                    {counts}
                </div>
            </div>
        }
    });

module.exports = MyCounts;