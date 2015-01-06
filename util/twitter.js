// Twitter config
var Twit = require('twit');
var watsonModule = require('./watson');

var Watson = function(watsonConfig, twitterConfig) {
  
// var w = new Watson({??}   ,  {????})

  var twitterData = '';

  var T = new Twit({
          consumer_key        :  twitterConfig.consumer_key,
          consumer_secret     :  twitterConfig.consumer_secret,
          access_token        :  twitterConfig.access_token,
          access_token_secret :  twitterConfig.access_token_secret,
  });
  
    // create a profile request with the text and the htpps options and call it
    // `req.body.subject` is the subject that was entered by the end user
    // TODO: to have the end user enter the date

  Watson.prototype.user = function(twitterHandler, callback) {
    //var userData = '';
    T.get('statuses/user_timeline', { screen_name: twitterHandler, count: 100 },
                             function(err, data, response) {
                              //var stringz = '';
                              if (data.length) {
                                for (var i=0;i<data.length;i++){
                                  twitterData += data[i].text;
                                }
                                watsonModule.watson(watsonConfig, twitterData, callback);
                              } else {
                                callback(data, err);
                              }
                              
    });
  };

//Returns a collection of the most recent Tweets and retweets posted by the authenticating user and the users they follow. The home timeline is central to how most users interact with the Twitter service.
  Watson.prototype.userHome = function(callback, params) {

    var getData = function(data) {
      for (var i = 0; i < data.length; i++){
        twitterData += data[i].text;
      }
      watsonModule.watson(watsonConfig, twitterData, callback);
    }; 

    if (params){
      T.get('statuses/home_timeline', params, function(err, data, response) { getData(data); });
    } else {
      T.get('statuses/home_timeline', function(err, data, response) { getData(data); });
    }
  };
  

  // return all tweets q: is required!

  Watson.prototype.searchGeo = function(callback, query, geotype) {
    var geoSearch;
    if (typeof geotype === 'string') {
      geoSearch = geoLocations[geotype].geo;
    } else if (Array.isArray(geotype)) {
      geoSearch = geotype;
    } else {
      geoSearch = null;
    }

    T.get('search/tweets', { q: query, geocode: geoSearch }, function(err, data, response) {
    
      if (data.statuses) {
        for(var i = 0; i < data.statuses.length; i++) {
          // accumulate the data (each tweet as a text) received from twitter
          twitterData += data.statuses[i].text;
        }
        watsonModule.watson(watsonConfig, twitterData, callback);
      } else {
        console.log(data)
        callback(data, err);
      }
    });

   
      

  };

  Watson.prototype.searchTweets = function(callback, params) {

    T.get('search/tweets', params, function(err, data, response) {
    
      if (data.statuses) {
        for(var i = 0; i < data.statuses.length; i++) {
          // accumulate the data (each tweet as a text) received from twitter
          twitterData += data.statuses[i].text;
        }
        watsonModule.watson(watsonConfig, twitterData, callback);
      } else {
        console.log(data)
        callback(data, err);
      }
    });
  };
   
      

  };




};

module.exports = Watson;


// T.get('search/tweets', { q: ''+twitterHandler+' since:2014-10-01', 
//                              count: 5000, geocode: req.body.geo, lang: 'en' },
//                              function(err, data, response) {

  //for search tweets
      // for(var i = 0; i < data.statuses.length; i++) {
      //   // accumulate the data (each tweet as a text) received from twitter
      //   twitterData += data.statuses[i].text;
      // }
