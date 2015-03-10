/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router-component').Link;
var API = require('../util/api.js');
var CountStore = require('../stores/count-store.js');
var DetailsStore = require('../stores/details-store.js');
var merge  = require('react/lib/merge');
var moment  = require('moment');


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
            this.setState(merge(countDetails(this.props.countId), count(this.props.countId)));
        },
        getInitialState:function() {
            var countObj = count(this.props.countId);
            var countDetailsObj = countDetails(this.props.countId);

            var initialStateObj = merge(countObj, countDetailsObj);

            return initialStateObj;
        },
        shouldComponentUpdate: function(nextProps, nextState) {
            // If we have no data (we are expecting an array in this example), we won't render the chart
            return true;
        },
        componentDidUpdate: function() {
            this.renderChart();
        },
        getSeriesData: function() {

            var seriesData = [];

            var counts = this.state.countDetails.counts.map(function(item, i){
                var date = moment(item.date).toDate();
                seriesData.push([Date.UTC(date.getUTCFullYear(),  date.getUTCMonth(), date.getUTCDate()), parseFloat(item.value)])
            });

            return seriesData;

        },
        render:function() {

            var countHref = "/count/" + this.state.count.id;

            var graphContainerRef = React.DOM.div({className: "chart", ref: "chartNode"});

            return  <div>
                        <ol className="breadcrumb">
                            <li><Link href="/my-counts">My Counts</Link></li>
                            <li><Link href={countHref}>{this.state.count.countName}</Link></li>
                            <li className="active">Graph</li>
                        </ol>
                        {graphContainerRef}
                    </div>
        },
        renderChart: function() {
            var that = this;

            var seriesData = this.getSeriesData();

            var node = this.refs.chartNode.getDOMNode();
            jQuery(function ($) {
                $(node).highcharts({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: that.state.count.countName
                    },
                    subtitle: {
                        text: 'Numeric over time - Count Graph'
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: { // don't display the dummy year
                            month: '%e. %b',
                            year: '%b'
                        },
                        title: {
                            text: 'Date'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'X Axix (state)'
                        },
                        min: 0
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
                    },

                    plotOptions: {
                        spline: {
                            marker: {
                                enabled: true
                            }
                        }
                    },

                    series: [{
                        name: 'Plot of recorded values',
                        data: that.getSeriesData()
                    }]
                });
            });
        }
    });

module.exports = Count;