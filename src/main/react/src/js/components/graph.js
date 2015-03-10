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
                        text: 'Source: counted.it'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature'
                        },
                        labels: {
                            formatter: function () {
                                return this.value + '°';
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: [{
                        name: 'Tokyo',
                        marker: {
                            symbol: 'square'
                        },
                        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                            y: 26.5,
                            marker: {
                                symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
                            }
                        }, 23.3, 18.3, 13.9, 9.6]

                    }, {
                        name: 'London',
                        marker: {
                            symbol: 'diamond'
                        },
                        data: [{
                            y: 3.9,
                            marker: {
                                symbol: 'url(http://www.highcharts.com/demo/gfx/snow.png)'
                            }
                        }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                    }]
                });
            });
        }
    });

module.exports = Count;