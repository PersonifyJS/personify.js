// Twitter config
var Twit = require('twit');
var watson = require('./watson');

var dataFromTwitterUS;
var dataFromTwitterPerState;

module.exports.twitterData = function(req, res) {
  var T = new Twit({
          consumer_key:         'nnnMzv63aJKbQgzF77vQLXCm0'
        , consumer_secret:      'BAG1XL3PHUVw6AsW7K0dRcIv6qkITkWARmZL9Bb8nOKfTkbTpo'
        , access_token:         '35398491-9KTshSy7QNiKh0Ia71AeZ6D1XMg6teKJWAwp6YNNE'
        , access_token_secret:  'ivIGOcV4OHxW9lRrW7pevEcxwtk2RDGzVSW6IdOqz9R0D'
  });
  
  // create a profile request with the text and the htpps options and call it
    // `req.body.subject` is the subject that was entered by the end user
    // TODO: to have the end user enter the date
    var analyzeState = function () {
      dataFromTwitterPerState = "";
      console.log('analyzeState')
      T.get('search/tweets', { q: ''+req.body.subject+' since:2014-10-01', 
                               count: 5000, geocode: req.body.geo, lang: 'en' },
                               function(err, data, response) {
        console.log(data.statuses.length)
        for(var i = 0; i < data.statuses.length; i++) {
          // accumulate the data (each tweet as a text) received from twitter
          dataFromTwitterPerState += data.statuses[i].text;
        }
        watson.watson(dataFromTwitterPerState, res, false);
      });
    };

    var analyzeNation = function() {
      dataFromTwitterUS = "";
      console.log('analyzeNation')
      // geoUS: the geo location of United States
      var geoUS = ['39.8','-95.583068847656','2500km']
      T.get('search/tweets', { q: ''+req.body.subject+' since:2014-10-01', 
                               count: 5000, geocode: geoUS , lang: 'en' },
                               function(err, data, response) {

        for(var i = 0; i < data.statuses.length; i++) {
          // accumulate the data (each tweet as a text) received from twitter
          dataFromTwitterUS += data.statuses[i].text;
        }
        watson.watson(dataFromTwitterUS, res, true);
        analyzeState();
      });
    };
    analyzeNation();
};