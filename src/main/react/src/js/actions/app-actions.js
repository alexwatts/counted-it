var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    loginSuccess:function(auth){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.LOGIN_SUCCESS,
            item: auth
        })
    },
    loginFailiure:function(response){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.LOGIN_FAILURE,
            item: response
        })
    }
}

module.exports = AppActions;