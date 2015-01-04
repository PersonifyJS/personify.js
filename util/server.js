var twitter = require('./twitter');

// exporting the Watson module to the end user
module.exports.watson =  function() { 
  
  twitter.twitterData(watsonConfig, twitterConfig);

  var Watson = function(watsonConfig, twitterConfig) {}; // create a class

  Watson.prototype.get = function(????){

  }

   
};




// //////////============
// end user
// var Watson = require('watson');

// var w = new Watson({}, {});

// w.user('@user'); ////// => get back results from watson







