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
        componentWillMount:function() {
            //Listen for updates from the stores
            DetailsStore.addChangeListener(this._onDetailsChange);
        },
        _onDetailsChange:function() {
            console.log('details change!');
            this.setState(merge(countDetails(this.props.countId), count(this.props.countId)));
        },
        getInitialState:function() {
            var countObj = count(this.props.countId);
            var countDetailsObj = countDetails(this.props.countId);

            var formObj = {
                countValue: '',
                date: date(this.getTodaysDate())
            };

            var initialStateObj = merge(merge(countObj, countDetailsObj), formObj);

            console.log(initialStateObj);

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
            console.log(item);
            API.deleteCountValueForDetail(this.props.countId, item);
        },
        render:function() {
            var that = this;
            if (this.state.countDetails) {
                var counts = this.state.countDetails.counts.map(function(item, i){
                    return (
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-2 col-xs-2">value: {item.value}</div>
                                <div className="col-md-3 col-xs-3">date: {item.date}</div>
                                <div className="col-md-3 col-xs-3"><button data={item} className="btn btn-danger" onClick={that.handleDelete.bind(this, item)}>Delete</button></div>
                            </div>
                        </li>
                    )
                });
            }

            return  <div>
                        <ol className="breadcrumb">
                            <li><a href="#">My Counts</a></li>
                            <li className="active">{this.state.count.countName}</li>
                        </ol>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="row">
                                    <img className="img-container-small" src="../numeric-over-time.png"></img>
                                </div>
                                <div className="row">
                                    <span className="label label-default">{this.state.count.countName}</span>
                                </div>
                            </div>
                            <div className="panel-body">
                                <p>
                                    <div className="row">
                                        <div className="col-md-12 col-xs-12">
                                                <div className="input-group">
                                                    <button type="button" className="btn btn-default" aria-expanded="false">today</button>
                                                    <input type="date" value={this.state.date} onChange={this.handleValueChange.bind(this, 'date')}/>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="row top7">
                                        <div className="col-md-12 col-xs-12">
                                            <div className="input-group">
                                                <span className="input-group-addon minw70">Value</span>
                                                <input type="number" className="form-control" aria-label="" value={this.state.countValue} onChange={this.handleValueChange.bind(this, 'countValue')}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row top7">
                                        <div className={this.state.countValue ? "alert alert-warning hide" : "alert alert-warning" } role="alert">To add a count value, add purely numeric text</div>
                                    </div>
                                    <div className="row top7">
                                        <div className="col-md-12 col-xs-12">
                                            <Link onClick={this.handleCreate.bind(this, 'count value')} className={this.state.countValue ? "btn btn-primary minw200" : "btn btn-primary minw200 hide" } href="#" role="button">Add Count Value</Link>
                                        </div>
                                    </div>
                                </p>
                            </div>
                            <ul className="list-group">
                                {counts}
                            </ul>
                        </div>
                    </div>
        }
    });

module.exports = Count;