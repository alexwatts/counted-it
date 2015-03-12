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

                    <div key={item.id} className="col-md-3 col-lg-3 col-sm-3">
                        <div  className="panel panel-primary panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title"><Link href={detailsLink}>{item.countName}</Link></h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                        <div className="row">
                                            <div className="col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                                <Link href={detailsLink}><span className="glyphicon glyphicon-stats glyph-large"></span></Link>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                                <button data={item} className="btn btn-danger top5" onClick={that.handleDelete.bind(null, item)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            });

            return <div className="page-header">
                <h1>Things you are counting <small>you are counting {this.state.myCounts.length} things</small></h1>
                <div className="alert alert-warning" role="alert">Click on the name of a count to start entering values. To delete a count you've created you can click Delete</div>
                <div className="row">
                    {counts}
                </div>
            </div>
        }
    });

module.exports = MyCounts;