/** @jsx React.DOM */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

//These are the count objects
var _myCounts = [{id: 1, countType: 'Numeric over time', countName: 'weight loss'}];

function _init() {
    _myCounts[1] = {id: 1, countType: 'Numeric over time', countName: 'weight loss'};
}

function _updateMyCounts(myCounts){
    var arrayLength = myCounts.length;
    for (var i = 0; i < arrayLength; i++) {
        _myCounts[myCounts[i].id] = myCounts[i];
    }
}

function _addCount(count){
    _myCounts[count.id] = count;
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
        if (_myCounts[countId] === undefined) {
            _init();
        }
        return _myCounts[countId];
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action; // this is our action from handleViewAction
        switch(action.actionType){
            case AppConstants.COUNT_ADDED:
                _addCount(payload.action.count);
                console.log('_addCount');
                break;
            case AppConstants.UPDATE_MY_COUNTS:
                _updateMyCounts(payload.action.counts);
                console.log('_updateMyCounts');
                break;
        }
        CountStore.emitChange();
        return true;
    })
});

module.exports = CountStore;
