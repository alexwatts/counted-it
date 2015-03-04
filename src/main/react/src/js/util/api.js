var request = require('superagent');

var API = {
    //Main namespace for API object
};

API.getProfile = function() {

    //Server API Request
    //request
    //    .get('/profile')
    //    .end(function(res){
    //        return res;
    //    });

    //Mocked server response -- TODO make a intelligent switch pattern here
    return {'stat':'ok','profile':{'providerName':'Google+','identifier':'https:\/\/www.google.com\/profiles\/109824759333308411017','displayName':'alex watts','name':{'formatted':'alex watts','givenName':'alex','familyName':'watts'},'url':'https:\/\/plus.google.com\/109824759333308411017','photo':'https:\/\/lh3.googleusercontent.com\/-XdUIqdMkCWA\/AAAAAAAAAAI\/AAAAAAAAAAA\/4252rscbv5M\/photo.jpg?sz=400','gender':'male','googleUserId':'109824759333308411017','providerSpecifier':'googleplus'}};
};

module.exports = API;