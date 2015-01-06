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

                              for (var i=0;i<data.length;i++){
                                twitterData += data[i].text;
                              }
                              watsonModule.watson(watsonConfig, twitterData, callback);

    });
  };

//Returns a collection of the most recent Tweets and retweets posted by the authenticating user and the users they follow. The home timeline is central to how most users interact with the Twitter service.
  Watson.prototype.userHome = function(params, callback) {
    var getdata = function(err, data, response) {
      for (var i=0;i<data.length;i++){
        twitterData += data[i].text;
      }
      watsonModule.watson(watsonConfig, twitterData, callback);
    }; 

    if (params){
      T.get('statuses/home_timeline', params, getData(err, data, response);
    } else {
    T.get('statuses/home_timeline', getData(err, data, response);
    }
    
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
