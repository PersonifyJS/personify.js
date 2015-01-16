![Alt text](https://s3-us-west-1.amazonaws.com/personify.js/Personify.js_logo.png)

[![Build Status](https://travis-ci.org/PersonifyJS/personify.js.png)](https://travis-ci.org/PersonifyJS/personify.js)
#Personify.js

A JavaScript based library that allows easy access to IBM Watson features utilizing Twitter data. IBM Watson has some of the most advanced linguistic analytics tools available today. Twitter is one of the world's most popular text-based communication platforms. Leverage the power of both with minimal effort through Personify.js. 

Our current version implements:

- Watson User Modeling service which extracts cognitive and social characteristics, including Big Five, Values, and Needs, from communications data provided.
- Watson Machine Translation service which converts text input in one language into a desired language for the end user. Translation is available for English, Brazilian Portuguese, Spanish, French and Arabic.
- Twitter REST API.
- Twitter Streaming API.


##Installing

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
// Instantiate a new Personify object and pass in OAuth credentials 
// inside of an object literal
//
var P = new Personify(config);

//
// Use Watson to discover personality traits, values and needs for a Twitter user
// '@' can be used before a username, but is not required (e.g. '@userName')
//
var params1 = { 
                screen_name: 'userName',
                count: 100
              };

P.userPersonify( params1 , function (data, error) {
    console.log(data, error);
});

//
// Watson provides a personality assessment of the combined input of tweets in a 
// user's home timeline. Includes tweets from friends and accounts the user is following, 
// and their retweets
//
var params2 = { 
                count: 100, 
                exclude_tweets: true 
              };

P.homePersonify( params2, function (data, error) {
    console.log(data, error);
});

//
// Search Twitter with a (required) keyword. Accepts all of Twitter's optional search 
// parameters and a few additional ones we've created for your convenience.
//
var params3 = { 
                q: '#JavaScript', 
                geocode: 'San Francisco' //geocode takes most major US cities and all US states
              };                         //see this method in API for a full list of city and state shortcut terms

P.searchPersonify( params3 , function (data, error) {
  console.log(data, error);
});

//
// Grab a number of Tweets in a specified language and get back both the original text and its 
// translation in another destination language. Most of the search parameters available 
// here are the same as those in our searchTweet method.
//
var params4 = { 
                q: 'JavaScript', 
                fromLanguage: 'ar', // Translate from Arabic
                toLanguage: 'en',   // to English
                outputType: 'text'  // Choose from text, json or XML
              };

P.searchTranslate( params4 , function (data, error) {
    console.log(data, error);
});

//
// Input a Twitter handle and get back their tweets translated
//
var params5 = {
                screen_name: 'userName',
                fromLanguage: 'en',
                toLanguage: 'fr',
                outputType: 'text'
              };

P.userTranslate( params5, function(data, error){
    console.log(data, error);
});

//
// Get tweets from your home timeline and have them translated into another language
//
var params6 = {
                count: 150,
                fromLanguage: 'en',
                toLanguage: 'fr',
                outputType: 'json'
              };

P.homeTranslate( params6, function(data, error){
    console.log(data, error);
});

//
// Find public tweets talkng about the Large Hadron Collider using Twitter's Streaming API and 
// translate them into another language
//
var params7 = {
                track: 'twitter',
                fromLanguage: 'en',
                toLanguage: 'fr',
                outputType: 'text'
              };

P.streamTranslate( params7, function(data, error){
    console.log(data, error);
});

```

## Personify API:

#### var P = new Personify( config )

Instantiate a new Personify object and pass in a config.

config - Type: `Object`

At least one set of OAuth credentials from both Twitter and IBM Bluemix are required to use the services Personify.js leverages for you.

#### P.userPersonify( userName , callback ) 

userName - Type: `String`

Required. Represents a Twitter handle. Optionally you can include an '@' before the username.

See [here](https://dev.twitter.com/rest/reference/get/statuses/user_timeline) for more information on optional parameters.

#### P.homePersonify( [params] , callback ) 

[params] - Type: `Object`

Key-value pairs inside of [params] are optional, but at least an empty object literal is required. 

See [here](https://dev.twitter.com/rest/reference/get/statuses/home_timeline) for more information on optional parameters.

#### P.searchPersonify( { q: input , [params] }, callback ) 

input Type: `String`

The 'q' key and its associated value, which is a string, are required. input can be any word you may use to search in Twitter's internal search engine. Any additional search parameters are optional.

See [here](https://dev.twitter.com/rest/reference/get/search/tweets) for more information on optional parameters.

For a list of shortcut terms for geocode, see [geoList.txt](lib/geoList.txt). geocode works for searchPersonify and searchTranslate methods. 

####  P.searchTranslate( params , callback ) 

var params = {
               q: input,
               fromLanguage: 'en',
               toLanguage: 'fr',
               outputType: 'json'
             }

params - Type: `Object`
input - Type: `String` or `Number` or `Array`

Language key: 
- 'ar' = Arabic
- 'en' = English
- 'es' = Spanish
- 'fr' = French
- 'pt' = Brazilian Portuguese

Output Types:
- 'text'
- 'JSON'
- 'XML'

All keys shown in `params` are required. 
See [here](https://dev.twitter.com/rest/reference/get/search/tweets) for more information on optional parameters.

####  P.userTranslate( params , callback ) 

var params = {
               screen_name: input,
               fromLanguage: 'en',
               toLanguage: 'fr',
               outputType: 'json'
             }

params - Type: `Object`

Please see Language key and Output Types under searchTranslate method in API.

See [here](https://dev.twitter.com/rest/reference/get/statuses/user_timeline) for more information on optional parameters.

####  P.homeTranslate( params , callback)

var params = {
               fromLanguage: 'en',
               toLanguage: 'fr',
               outputType: 'json'
             }

All keys in params are required. Optionally you can specify a `count` key. This limits the number of Tweets for the search. 

count : val
val - Type: `Number`
val defaults to 20 and has a max of 200.

See [here](https://dev.twitter.com/rest/reference/get/statuses/home_timeline) for more information on optional parameters.

####  P.streamTranslate( params , callback )

var params = {
               track: input,
               fromLanguage: 'en',
               toLanguage: 'fr',
               outputType: 'json'
             }

All keys in params are required for streaming.
Please see Language key and Output Type options under searchTranslate method in API.

Additionally, optional search parameters that can be added to params:
- locations : boundingBox
- stop : time

boundingBox - Type: `Array`
boundingBox coordinates can be found [here](https://www.flickr.com/places/info/1)

boundingBox example: 
var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];

time - Type: `Number`
time is the number of miliseconds after the stream starts that you want the stream to stop

See [here](https://dev.twitter.com/streaming/reference/post/statuses/filter) for more information on optional parameters.

#### callback

Type: `Function`

- callback takes two parameters, data and error, in that order. 
- callback is required for all methods. 

-------

##Find your OAuth credentials

Go here to create a Twitter app and get OAuth credentials (if you haven't already): https://dev.twitter.com/apps/new

In order to use IBM Watson, you need to:
- Register for an IBM Bluemix account: http://www-01.ibm.com/software/bluemix/
- Create an App
- Add User Modeling and/ or Machine Translation service(s)
- From there, IBM will provide your credentials


##How do I run the tests?

To make the tests pass you will need to fill out the file: `config.js` inside the tests folder.

To run the tests:

```
npm test
```

## Contributing

See 

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [STYLE-GUIDE.md](STYLE-GUIDE.md) 

## To Do

- Expand library with more Watson services

## Development Team

- [Essam Al Joubori](https://github.com/essamjoubori)
- [Rohan Agrawal](https://github.com/rohanagrawal)
- [Phil Elauria](https://github.com/philelauria)

## Example Application
Our [PersonifyApp](http://personify.mybluemix.net/) grabs tweets based on a keyword search and geolocation parameters and returns a Big Five assessment based on those tweets. It then compares that local result to the US in general. A company for example, might be interested to know about the collective Big Five traits of people who are talking about their products, services or brand. 

-------


## Release History
- 1.0.2 Personify logo added
- 1.0.1 README.md updated
- 1.0.0 Initial release

