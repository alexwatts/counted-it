/** @jsx React.DOM */
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _profile = {'stat':'','profile':{'providerName':'','identifier':'','displayName':'','name':{'formatted':'','givenName':'','familyName':''},'url':'','photo':'','gender':'','googleUserId':'','providerSpecifier':''}};

function _updateProfile(profile){
    _profile = profile;
}

var AppStore = merge(EventEmitter.prototype, {
    emitChange:function(){
        this.emit(CHANGE_EVENT)
    },

    addChangeListener:function(callback){
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener:function(callback){
        this.removeListener(CHANGE_EVENT, callback)
    },

    getProfile:function(){
        return _profile
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action; // this is our action from handleViewAction
        switch(action.actionType){
            case AppConstants.UPDATE_PROFILE:
                _updateProfile(payload.action.profile);
                break;
        }
        AppStore.emitChange();

        return true;
    })
});

module.exports = AppStore;
