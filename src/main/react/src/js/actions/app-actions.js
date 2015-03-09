var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    updateProfile:function(profile){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.UPDATE_PROFILE,
            profile: profile
        })
    },
    countAdded:function(count){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.COUNT_ADDED,
            count: count
        })
    },
    updateMyCounts:function(counts){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.UPDATE_MY_COUNTS,
            counts: counts
        })
    },
    updateCountDetails:function(details){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.UPDATE_COUNT_DETAILS,
            details: details
        })
    },
    updatePage:function(page){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.UPDATE_PAGE,
            page: page
        })
    },
    addCountToDetails:function(details){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_COUNT_TO_DETAILS,
            details: details
        })
    },
    deleteCountValueForDetail:function(countIdAndItem){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.DELETE_COUNT_ITEM_FROM_DETAILS,
            countIdAndItem: countIdAndItem
        })
    }
}

module.exports = AppActions;