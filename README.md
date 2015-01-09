#personify.js

A JavaScript based library that allows easy access to IBM Watson features utilizing Twitter data. IBM Watson has some of the most advanced linguistic analytics tools available today. Twitter is one of the world's most popular text-based communication platforms. Leverage the power of both with minimal effort through personify.js. 

Our current version implements:

- Watson User Modeling service extracts cognitive and social characteristics, including Big Five, Values, and Needs, from communications data provided.
- Watson Machine Translation service converts text input in one language into a desired language for the end user. Translation is available for English, Brazilian Portuguese, Spanish, French and Arabic.
- Twitter REST API.

#Installing

```
npm install personify --save
```

##Usage:

```javascript
var Personify = require('personify');

// For every service you use through Watson, IBM will provide you with a separate set of 
// OAuth credentials. See below to find out where to get these credentials.
var config = {
// example credentials for Watson Machine Translation service
    translateConfig : {
        service_url:          '...',
        service_username:     '...',
        service_password:     '...'
    },
// example credentials for Watson User Modeling service
    personalityConfig : {
        service_url:          '...',
        service_username:     '...',
        service_password:     '...'
    },
// example credentials for Twitter API
    twitterConfig : {
        consumer_key:         '...',
        consumer_secret:      '...',
        access_token:         '...',
        access_token_secret:  '...'
    }
};

//
// Use Watson to discover personality traits, values and needs for a Twitter user
// '@' can be used before a username, but is not required (e.g. '@userName')
//
P.user = ( 'userName' , function (data, err) {
    console.log(data, err);
});

//
// Watson provides a personality assessment of the combined input of tweets in a 
// user's home timeline. Includes tweets from friends and accounts the user is following, 
// and their retweets
//
var params1 = { 
                count: 100, 
                exclude_tweets: true 
              };

P.userHome( params1, function (data, err) {
    console.log(data, err);
});

//
// Search Twitter with a (required) keyword. Accepts all of Twitter's optional search 
// parameters and a few additional ones we've created for your convenience.
//
var params2 = { 
                q: '#JavaScript', 
                geoCode: 'San Francisco'
              };

P.searchTweet = function( params2 , function (data, err) {
  console.log(data, err);
});

//
// Grab a number of Tweets in a specified language and get back both the original text and its 
// translation in another destination language. Most of the search parameters available 
// here are the same as those in our searchTweet method.
//

var params3 = { 
                q: 'JavaScript', 
                fromLanguage: 'ar', //Translate from Arabic
                toLanguage: 'en',   //to English
                outputType: 'text' 
              };

P.translate( params3 , function (data, err) {
    console.log(data, err);
});

```

# personify API:

#####`P.user( 'input', callback )`

**'input'**

Required. Object type is a string representing a Twitter username. Optionally you can include an '@' before the username.

#####`P.userHome( { params }, callback )`

**params**

Key-value pairs are optional, but at least empty object literal brackets are required. 

#####`P.searchTweet( { q: 'input', additional params }, callback )`

The 'q' key and its associated value, which is a string, are required. The string can be any word you may use to search in Twitter's search bar. Any additional key-value pairs are optional.

##### `P.translate( { q: 'input', fromLanguage: 'en', toLanguage: 'fr', outputType: 'json' }, callback )`

All key-value pairs inside of the object passed as the first argument are required. 

**callback**

`function (data, err)`

- `data` is the parsed data received from IBM Watson.
- callback is required for all methods. 

-------

#Find your OAuth credentials

Go here to create a Twitter app and get OAuth credentials (if you haven't already): https://dev.twitter.com/apps/new

In order to use IBM Watson, you need to:
- Register for an IBM Bluemix account: http://www-01.ibm.com/software/bluemix/
- Create an App
- Add a User Modeling service
- From there you can get your credentials


#How do I run the tests?

To make the tests pass you will need to fill out the file: `config.js` inside the tests folder. The file should look something like this:

```
var config = {
    translateConfig : {
        service_url:          '...',
        service_username:     '...',
        service_password:     '...'
    },
    personalityConfig : {
        service_url:          '...',
        service_username:     '...',
        service_password:     '...'
    },
    twitterConfig : {
        consumer_key:         '...',
        consumer_secret:      '...',
        access_token:         '...',
        access_token_secret:  '...'
    }
};

module.exports = config;
```

To run the tests:

```
npm test
```

### Contributing

See 

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [STYLE-GUIDE.md](STYLE-GUIDE.md) 

### To Do

- Expand library with more Watson services

-------


## Release History

###0.1.0 Initial release

