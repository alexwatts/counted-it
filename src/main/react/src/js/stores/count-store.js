/** @jsx React.DOM */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

//These are the count objects
var _myCounts = [];


function _updateMyCounts(myCounts){
    _myCounts = [];
    var arrayLength = myCounts.length;
    for (var i = 0; i < arrayLength; i++) {
        _myCounts.push(myCounts[i]);
    }
}

function _addCount(count){
    _myCounts.push(count);
}

function _deleteCount(count){
    var countsCopy = [];
    var arrayLength = _myCounts.length;
    for (var i = 0; i < arrayLength; i++) {
        if (_myCounts[i].id === count.countId) {
            //dont' copy
        } else {
            countsCopy.push(_myCounts[i]);
        }
    }
    _myCounts = countsCopy;
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

    getCount:function(countId){
        var itemToReturn;
        _myCounts.map(function(item, i) {
            if (parseInt(item.id) === parseInt(countId)) {
                itemToReturn = item;
            }
        });
        return itemToReturn;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){

        var action = payload.action; // this is our action from handleViewAction
        switch(action.actionType){
            case AppConstants.COUNT_ADDED:
                _addCount(payload.action.count);
                break;
            case AppConstants.UPDATE_MY_COUNTS:
                _updateMyCounts(payload.action.counts);
                break;
            case AppConstants.DELETE_COUNT:
                _deleteCount(payload.action.count);
                break;
        }
        CountStore.emitChange();
        return true;
    })
});

module.exports = CountStore;
