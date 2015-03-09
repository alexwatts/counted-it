/** @jsx React.DOM */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

//These are the details of the counts in the store
var _countDetails = [];

function _init() {
    _countDetails[1] = {id: 1, counts:[{date: '2015-03-01', value:16.0},{date: '2015-03-04', value:14.0}]};
}

function _addCountToDetails(details) {
    var detailsRecord = _countDetails[details.detailsId];
    var counts = detailsRecord.counts;
    counts.push({date:details.date, value:details.countValue});
    detailsRecord.counts = counts;
    _countDetails[details.detailId] = detailsRecord;
}

function _updateCountDetails(details){
    _countDetails[details.id] = details;
}

function _deleteCountValueForDetail(countIdAndItem){
    var detailsObj = _countDetails[countIdAndItem.detailsId];
    var countsCopy = [];
    var arrayLength = detailsObj.counts.length;
    for (var i = 0; i < arrayLength; i++) {

        console.log(detailsObj.counts[i]);
        console.log(countIdAndItem.countItem);

        if ((detailsObj.counts[i].value === countIdAndItem.countItem.value) &&
            (detailsObj.counts[i].date === countIdAndItem.countItem.date)) {


        } else {
            countsCopy.push(detailsObj.counts[i]);
        }
    }
    detailsObj.counts = countsCopy;

    _countDetails[countIdAndItem.detailsId] = detailsObj;
}

var DetailsStore = merge(EventEmitter.prototype, {
    emitChange:function(){
        this.emit(CHANGE_EVENT)
    },

    addChangeListener:function(callback){
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener:function(callback){
        this.removeListener(CHANGE_EVENT, callback)
    },

    getCountDetail:function(countId){
        if (_countDetails[countId] === undefined) {
            _init();
        }
        return _countDetails[countId];
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action; // this is our action from handleViewAction
        switch(action.actionType){
            case AppConstants.UPDATE_COUNT_DETAILS:
                _updateCountDetails(payload.action.details);
                break;
            case AppConstants.ADD_COUNT_TO_DETAILS:
                _addCountToDetails(payload.action.details);
                break;
            case AppConstants.DELETE_COUNT_ITEM_FROM_DETAILS:
                _deleteCountValueForDetail(payload.action.countIdAndItem);
                break;

        }

        DetailsStore.emitChange();

        return true;
    })
});

module.exports = DetailsStore;
