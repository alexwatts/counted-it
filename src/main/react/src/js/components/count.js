/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router-component').Link;
var API = require('../util/api.js');
var CountStore = require('../stores/count-store.js');
var DetailsStore = require('../stores/details-store.js');
var merge  = require('react/lib/merge');

function countDetails(countId){
    return {countDetails: DetailsStore.getCountDetail(countId)};
}

function count(countId){
    return {count: CountStore.getCount(countId)};
}

function date(date) {
    return date;
}

var Count =
    React.createClass({
        componentDidMount:function() {
            //Initialise store objects
            API.getCountDetails(this.props.countId);
        },
        componentWillUnmount:function() {
            //Cleanup store objects
            DetailsStore.removeChangeListener(this._onDetailsChange);
        },
        componentWillMount:function() {
            //Listen for updates from the stores
            DetailsStore.addChangeListener(this._onDetailsChange);
        },
        _onDetailsChange:function() {
            if (this.isMounted()) {
                this.setState(merge(countDetails(this.props.countId), count(this.props.countId)));
            }
        },
        getInitialState:function() {
            var countObj = count(this.props.countId);
            var countDetailsObj = countDetails(this.props.countId);

            var formObj = {
                value: '',
                countName: '',
                count: {countName: ''},
                countDetails: {countDetailsValues: []},
                date: date(this.getTodaysDate())
            };

            var initialStateObj = merge(merge(countObj, countDetailsObj), formObj);

            return initialStateObj;
        },
        getTodaysDate: function() {
            var date = new Date();
            var todaysDate = date.toISOString().substring(0, 10);
            return todaysDate;
        },
        handleValueChange: function(name, e) {
            var change = {};
            change[name] = e.target.value;
            this.setState(change);
        },
        handleCreate: function (name, e) {
            e.preventDefault();
            API.createCountValueForDetail(this.props.countId, this.state.date, this.state.countValue);
        },
        handleDelete: function (item, e) {
            API.deleteCountValueForDetail(this.props.countId, item);
        },
        render:function() {
            var that = this;

            var showGraphLink = "/graph/" + this.props.countId;

            //if (this.state.countDetails) {
                var counts = this.state.countDetails.countDetailsValues.map(function(item, i){
                    return (
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-2 col-xs-2">value: {item.value}</div>
                                <div className="col-md-3 col-xs-3">date: {item.date}</div>
                                <div className="col-md-3 col-xs-3"><button data={item} className="btn btn-danger" onClick={that.handleDelete.bind(null, item)}>Delete</button></div>
                            </div>
                        </li>
                    )
                });
            //}

            return  <div>
                        <ol className="breadcrumb">
                            <li><Link href="/my-counts">My Counts</Link></li>
                            <li className="active">{this.state.count.countName}</li>
                        </ol>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="row">
                                    <span className="glyphicon glyphicon-stats glyph-large"></span>
                                </div>

                                <div className="row">
                                    <h2> {this.state.count.countName} - <small>You have {this.state.countDetails.countDetailsValues.length} recorded values</small> </h2>

                                    <div className="row">
                                        <div className="col-md-12 col-xs-12">
                                            <Link  className="btn btn-primary minw200" href={showGraphLink} role="button">Show Graph</Link>
                                        </div>
                                    </div>


                                    <ul className="list-group top10">
                                        {counts}
                                    </ul>

                                </div>
                            </div>
                            <div className="panel-body">
                                <p>
                                    <h3> Record a new value</h3>
                                    <div className="row">
                                        <div className="col-md-12 col-xs-12">
                                                <div className="input-group">
                                                    <span className="input-group-addon minw70">Date</span>
                                                    <input type="date" value={this.state.date} onChange={this.handleValueChange.bind(null, 'date')}/>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="row top7">
                                        <div className="col-md-12 col-xs-12">
                                            <div className="input-group">
                                                <span className="input-group-addon minw70">Value</span>
                                                <input type="number" className="form-control" aria-label="" value={this.state.countValue} onChange={this.handleValueChange.bind(null, 'countValue')}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row top7">
                                        <div className={this.state.countValue ? "alert alert-warning hide" : "alert alert-warning" } role="alert">To record a new value, enter some numeric text into the value field, after choosing a date for the value.</div>
                                    </div>
                                    <div className="row top7">
                                        <div className="col-md-12 col-xs-12">
                                            <Link onClick={this.handleCreate.bind(this, 'count value')} className={this.state.countValue ? "btn btn-primary minw200" : "btn btn-primary minw200 hide" } href="#" role="button">Add Count Value</Link>
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
        }
    });

module.exports = Count;