/** @jsx React.DOM */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

//These are the count objects
var _myCounts = [];

function _updateCounts(myCounts){
    _myCounts = myCounts;
}

function _addCount(count){
    _myCounts.push(count);
}

var CountStore = merge(EventEmitter.prototype, {
    emitChange:function(){
        this.emit(CHANGE_EVENT)
    },

    addChangeListener:function(callback){
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener:function(callback){
        this.removeListener(CHANGE_EVENT, callback)
    },

    getMyCounts:function(){
        return _myCounts;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action; // this is our action from handleViewAction
        switch(action.actionType){
            case AppConstants.COUNT_ADDED:
                _addCount(payload.action.count);
                break;
        }
        AppStore.emitChange();

        return true;
    })
});

module.exports = CountStore;
