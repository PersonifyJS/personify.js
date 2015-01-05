// Twitter config
var Twit = require('twit');
var watsonModule = require('./watson');

var Watson = function(watsonConfig, twitterConfig) {
  
// var w = new Watson({??}   ,  {????})
//new comment

  var twitterData;

  var T = new Twit({
          consumer_key        :  twitterConfig.consumer_key,
          consumer_secret     :  twitterConfig.consumer_secret,
          access_token        :  twitterConfig.access_token,
          access_token_secret :  twitterConfig.access_token_secret,
  });
  
    // create a profile request with the text and the htpps options and call it
    // `req.body.subject` is the subject that was entered by the end user
    // TODO: to have the end user enter the date
  Watson.prototype.user = function(twitterHandler) {
    T.get('search/tweets', { q: ''+twitterHandler+ },
                             function(err, data, response) {
      console.log(data.statuses.length)
      for(var i = 0; i < data.statuses.length; i++) {
        // accumulate the data (each tweet as a text) received from twitter
        twitterData += data.statuses[i].text;
      }
      watsonModule.watson(watsonConfig, twitterData);
    });
  };

};

module.exports = Watson;


// T.get('search/tweets', { q: ''+twitterHandler+' since:2014-10-01', 
//                              count: 5000, geocode: req.body.geo, lang: 'en' },
//                              function(err, data, response) {