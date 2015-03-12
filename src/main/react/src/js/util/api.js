var request = require('superagent');
var AppActions = require('../actions/app-actions');
var CountStore = require('../stores/count-store.js');
var merge = require('react/lib/merge');

var API = {
    //Main namespace for API object
};

var fakeId = 0;

API.getProfile = function() {
    //request
    //    .get('/data/profile')
    //    .end(function(res){
    //        AppActions.updateProfile(res.body);
    //    });
    return {'stat':'ok','profile':{'providerName':'Google+','identifier':'https:\/\/www.google.com\/profiles\/109824759333308411017','displayName':'alex watts','name':{'formatted':'alex watts','givenName':'alex','familyName':'watts'},'url':'https:\/\/plus.google.com\/109824759333308411017','photo':'https:\/\/lh3.googleusercontent.com\/-XdUIqdMkCWA\/AAAAAAAAAAI\/AAAAAAAAAAA\/4252rscbv5M\/photo.jpg?sz=400','gender':'male','googleUserId':'109824759333308411017','providerSpecifier':'googleplus'}};
};


API.createCount = function(countType, countName, callback, callbackObj) {
    //request
    //    .post('data/count')
    //    .send({ countType: countType, countName: countName })
    //    .set('Accept', 'application/json')
    //    .end(function(res){
    //        if (res.ok) {
    //            callback.apply(callbackObj, ['/my-counts']);
    //            AppActions.updatePage('MyCounts');
    //        } else {
    //            alert('Problem saving new count ' + res.text);
    //        }
    //    });
    fakeId++;
    AppActions.countAdded({id: fakeId, countType: countType, countName: countName});
    callback.apply(callbackObj, ['/my-counts']);
    AppActions.updatePage('MyCounts');
};

API.getMyCounts = function() {
    //request
    //    .get('/data/my-counts')
    //    .end(function(res){
    //        AppActions.updateMyCounts(res.body);
    //    });
    AppActions.updateMyCounts([{id: 1, countType: 'test', countName: 'test'}]);

    //AppActions.updateMyCounts(CountStore.getMyCounts());
};

API.getCountDetails = function(countId) {
    //request
    //    .get('/data/count/' + countId + '/details')
    //    .end(function(res){
    //        AppActions.updateCountDetails(merge({countId: countId}, res.body));
    //    });
    AppActions.updateCountDetails({countId: 1, countDetailsValues:[{id:1, date: "2012-01-01", value:"17"}]});
};

API.createCountValueForDetail = function(countId, date, value) {
    request
        .post('/data/count/' + countId + '/details')
        .send({date: date, value: value })
        .set('Accept', 'application/json')
        .end(function(res){
            if (res.ok) {
                AppActions.addCountToDetails(merge({countId: countId}, res.body));
            } else {
                alert('Problem saving new count ' + res.text);
            }
        });
};

API.deleteCountValueForDetail = function(countId, item) {
    request
        .del('/data/count/' + countId + '/details')
        .query('detailsValueId=' + item.id)
        .set('Accept', 'application/json')
        .end(function(res){
            if (res.ok) {
                AppActions.deleteCountValueForDetail(merge({countId: countId, detailsValueId: item.id}));
            } else {
                alert('Problem saving new count ' + res.text);
            }
        });
};

API.deleteCount = function(item) {
    request
        .del('/data/count/' + item.id)
        .set('Accept', 'application/json')
        .end(function(res){
            if (res.ok) {
                AppActions.deleteCount({countId: item.id});
            } else {
                alert('Problem saving new count ' + res.text);
            }
        });
};

module.exports = API;