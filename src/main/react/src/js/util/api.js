var request = require('superagent');
var AppActions = require('../actions/app-actions');
var CountStore = require('../stores/count-store.js');
var merge = require('react/lib/merge');

var API = {
    //Main namespace for API object
};

API.getProfile = function() {

    var profileObject = {};

    request
        .get('/data/profile')
        .end(function(res){
            AppActions.updateProfile(res.body);
        });

    //Mocked server response -- TODO make a intelligent switch pattern here
    //return {'stat':'ok','profile':{'providerName':'Google+','identifier':'https:\/\/www.google.com\/profiles\/109824759333308411017','displayName':'alex watts','name':{'formatted':'alex watts','givenName':'alex','familyName':'watts'},'url':'https:\/\/plus.google.com\/109824759333308411017','photo':'https:\/\/lh3.googleusercontent.com\/-XdUIqdMkCWA\/AAAAAAAAAAI\/AAAAAAAAAAA\/4252rscbv5M\/photo.jpg?sz=400','gender':'male','googleUserId':'109824759333308411017','providerSpecifier':'googleplus'}};
};

API.createCount = function(countType, countName) {

    request
        .post('data/count')
        .send({ countType: countType, countName: countName })
        .set('Accept', 'application/json')
        .end(function(res){
            if (res.ok) {
                AppActions.countAdded(res.body);
            } else {
                alert('Problem saving new count ' + res.text);
            }
        });

    //Mocked server response -- TODO make a intelligent switch pattern here

    //fakeId++;
    //AppActions.countAdded({id: fakeId, countType: countType, countName: countName});

};

API.getMyCounts = function() {


    request
        .get('/data/my-counts')
        .end(function(res){
            AppActions.updateMyCounts(res.body);
        });

    //Mocked server response -- TODO make a intelligent switch pattern here

    //AppActions.updateMyCounts([]);

    //AppActions.updateMyCounts(CountStore.getMyCounts());
};

API.getCountDetails = function(countId) {

    request
        .get('/data/count/' + countId + '/details')
        .end(function(res){
            AppActions.updateCountDetails(merge({countId: countId}, res.body));
        });

    //AppActions.updateCountDetails(DetailsStore.getCountDetail(countId));

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

    //AppActions.addCountToDetails({detailsId: detailsId, date: date, countValue: countValue});

};

API.deleteCountValueForDetail = function(countId, detailsValueId) {

    request
        .del('/data/count/' + countId + '/details')
        .send({detailsValueId: detailsValueId})
        .set('Accept', 'application/json')
        .end(function(res){
            if (res.ok) {
                AppActions.deleteCountValueForDetail(merge({countId: countId, detailsValueId: detailsValueId}, res.body));
            } else {
                alert('Problem saving new count ' + res.text);
            }
        });

}

module.exports = API;