#personify.js

JavaScript-based library for accessing IBM Watson features using Twitter data. 

Supports Twitter REST API.

#Installing

```
npm install personify
```

##Usage:

```javascript
var Personify = require('personify');


//See below to find out where to get these authentication credentials
var P = new Personify({
    watsonConfig : {
        service_url: '...',
        service_username: '...',
        service_password: '...'
    },
    twitterConfig : {
        consumer_key:         '...',
        consumer_secret:      '...',
        access_token:         '...',
        access_token_secret:  '...'
    }
});

//
//  Use Watson to discover personality traits, values and needs for a Twitter user
//  '@' can be used before a username, but is not required (e.g. '@userName')
//
P.user = ('userName', function(data, err){
    console.log(data);
});

//
//  Watson provides a personality assessment of the combined input of tweets in a user's home timeline
//  Includes tweets from friends and accounts the user is following, and their retweets
//
P.userHome({ count: 100, exclude_tweets: true },function(data, err){
    console.log(data);
});

//
//  get the list of user id's that follow @tolga_tezel
//
P.searchTweet = function({ q: '#JavaScript', geoCode: 'San Francisco' }, function(data, err){
  console.log(data);
});

```

# personify API:

##`P.user('input', callback)`

**'input'**

Required. Object type is a string representing a Twitter username. Optionally you can include an '@' before the username.

##`P.userHome({params}, callback)`

**params**

Key-value pairs are optional, but at least empty object literal brackets are required. 

##`P.searchTweet = function({ q: 'input', additional params}, callback)`

The 'q' key and its associated value, which should be a string, are required. The string can be any word you may use to search in Twitter's search bar. Any additional key-value pairs are optional. 

**callback**

`function (data, err)`

- `data` is the parsed data received from Twitter.
- callback is required for all methods. 

-------

#Find your OAuth credentials

Anything in the Twitter API:

Go here to create an app and get OAuth credentials (if you haven't already): https://dev.twitter.com/apps/new

In order to use IBM Watson, you need to register for an IBM Bluemix account: http://www-01.ibm.com/software/bluemix/


#How do I run the tests?

Create two files: `config1.js` and `config2.js` at the root of the `twit` folder. They should contain two different sets of oauth credentials for twit to use (two accounts are needed for testing interactions). They should both look something like this:

```
module.exports = {
    consumer_key: '...'
  , consumer_secret: '...'
  , access_token: '...'
  , access_token_secret: '...'
}
```

Then run the tests:

```
npm test
```

You can also run the example:

```
node examples/rtd2.js
```
-------

## Changelog

###0.1.0

