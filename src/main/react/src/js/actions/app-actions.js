var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    updateProfile:function(profile){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.UPDATE_PROFILE,
            profile: profile
        })
    }
}

module.exports = AppActions;