// Twitter config
var Twit = require('twit');
var personifyModule = require('./watson');
var geoLocations = require('../lib/geoLocations');
var translateModule = require('./translate');

var Personify = function(auth) {

  var twitterData = '';

  var T = new Twit({
          consumer_key        :  auth.twitterConfig.consumer_key,
          consumer_secret     :  auth.twitterConfig.consumer_secret,
          access_token        :  auth.twitterConfig.access_token,
          access_token_secret :  auth.twitterConfig.access_token_secret,
  });

    // create a profile request with the text and the htpps options and call it
    // `req.body.subject` is the subject that was entered by the end user
    // TODO: to have the end user enter the date

  Personify.prototype.user = function(twitterHandler, callback) {
    //var userData = '';
    T.get('statuses/user_timeline', { screen_name: twitterHandler, count: 100 },
                             function(err, data, response) {
                              if (data.length) {
                                for (var i=0;i<data.length;i++){
                                  twitterData += data[i].text;
                                }
                                personifyModule.watson(auth, twitterData, callback);
                              } else {
                                callback(data, err);
                              }
                              
    });
  };

//Returns a collection of the most recent Tweets and retweets posted by the authenticating user and the users they follow. The home timeline is central to how most users interact with the Twitter service.
  Personify.prototype.userHome = function(params, callback) {

    var getData = function(data) {
      if (data) {
        for (var i = 0; i < data.length; i++){
          twitterData += data[i].text;
        }
        personifyModule.watson(auth, twitterData, callback);
      } else {
        callback(null, 'No data found!')
      }   
    }; 

    if (params.length !== 0){
      T.get('statuses/home_timeline', params, function(err, data, response) { getData(data); });
    } else {
      T.get('statuses/home_timeline', function(err, data, response) { getData(data); });
    }
  };

  // return all tweets q: is required!

  Personify.prototype.searchTweets = function(params, callback) {
 
    var searchParams = params;
    var geotype;
 
    if (typeof searchParams.geocode === 'string') {
      if (geoLocations[searchParams.geocode]) {
        geotype = geoLocations[searchParams.geocode].geo;
        searchParams.geocode = geotype;
      } else {
        callback(null, 'Geo location is not valid!')
      }
      
    }
 
    T.get('search/tweets', searchParams, function(err, data, response) {
   
      if (data) {
        for(var i = 0; i < data.statuses.length; i++) {
          // accumulate the data (each tweet as a text) received from twitter
          twitterData += data.statuses[i].text;
        }
        personifyModule.watson(auth, twitterData, callback);
      } else {
        console.log(data)
        callback(data, err);
      }
    });
  };
//Personify methods above this line---------------------

//Translate methods below thisline-----------------------

  Personify.prototype.translation = function (callback){
   T.get('search/tweets', {q: '#lakers', lang: 'es'}, function(err, data, response) {
   
      if (data) {
        for(var i = 0; i < data.statuses.length; i++) {
          // accumulate the data (each tweet as a text) received from twitter
          twitterData += data.statuses[i].text;
        }
        translateModule.translate(auth, twitterData, 'mt-eses-enus', 'txt', callback);
      } else {
        console.log(data)
        callback(data, err);
      }
    });
  };

};

module.exports = Personify;
