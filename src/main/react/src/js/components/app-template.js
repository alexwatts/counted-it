/** @jsx React.DOM */
var React = require('react');
var Header = require('./header/header.js');
var Footer = require('./footer/footer.js');

var Template =
    React.createClass({
        render:function(){
            return (
                <div className="container">
                    <Header profile={this.props.profile}/>
                    {this.props.children}
                    <Footer />
                </div>
            )
        }
    });

module.exports = Template;