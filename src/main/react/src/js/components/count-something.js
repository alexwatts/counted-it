/** @jsx React.DOM */
var React = require('react');

var CountSomething =
    React.createClass({
        render:function() {

            return <div>
                        <div className="row">
                            <div className="col-md-12 col-xs-12">
                                <div className="input-group">
                                    <span className="input-group-addon minw70">Type</span>
                                    <input type="text" className="form-control" aria-label=""/>
                                    <div className="input-group-btn">
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">&nbsp;<span className="caret"></span></button>
                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <li><a href="#">Numeric over time</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row top7">
                            <div className="col-md-12 col-xs-12">
                                <div className="input-group">
                                    <span className="input-group-addon minw70">Name</span>
                                    <input type="text" className="form-control" aria-label=""/>
                                </div>
                            </div>
                        </div>
                    </div>

        }
    });

module.exports = CountSomething;