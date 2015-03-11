/** @jsx React.DOM */
var React = require('react');
var API = require('../util/api.js');
var CountStore = require('../stores/count-store.js');
var Link = require('react-router-component').Link;

function myCounts(){
    return {myCounts: CountStore.getMyCounts()}
}

var MyCounts =
    React.createClass({
        getInitialState:function(){
            return {myCounts: []};
        },
        componentDidMount:function(){
            //Initialise store objects
            API.getMyCounts();
        },
        componentWillMount:function(){
            //Listen for updates from the stores
            CountStore.addChangeListener(this._onCountsChange)
        },
        handleDelete: function (item, e) {
            API.deleteCount(item);
        },
        _onCountsChange:function(){
            if (this.isMounted()) {
                this.setState(myCounts());
            }
        },
        render:function() {
            var that = this;
            var counts = this.state.myCounts.map(function(item, i){

                var detailsLink = "/count/" + item.id;
                return (
                    <div key={item.id} className="col-md-2 col-xs-2">
                        <div className="well">
                            <div className="row">
                                    <Link href={detailsLink}><img className="img-container" src="numeric-over-time.png"></img></Link>
                            </div>
                            <div className="row">
                                <span className="label label-default">{item.countName}</span>
                            </div>
                            <div className="row">
                                <button data={item} className="btn btn-danger" onClick={that.handleDelete.bind(null, item)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            });

            return <div className="page-header">
                <h1>My Counts <small>things I am counting</small></h1>
                <div className="row">
                    {counts}
                </div>
            </div>
        }
    });

module.exports = MyCounts;