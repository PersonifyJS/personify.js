#personify.js

JavaScript-based library for accessing IBM Watson features using Twitter data. 

Supports Twitter REST API.

#Installing

```
npm install personify
```

##Usage:

```javascript
var Watson = require('watson');


//See below to find out where to get these authentication credentials
var P = new personify({
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

##`P.user('userName', callback)`
GET any of the REST API endpoints.

**path**

The endpoint to hit. When specifying `path` values, omit the **'.json'** at the end (i.e. use **'search/tweets'** instead of **'search/tweets.json'**).

**params**

(Optional) parameters for the request.

**callback**

`function (err, data, response)`

- `data` is the parsed data received from Twitter.
- `response` is the [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage) received from Twitter.

##`T.post(path, [params], callback)`

POST any of the REST API endpoints. Same usage as `T.get()`.

##`T.getAuth()`
Get the client's authentication tokens.

##`T.setAuth(tokens)`
Update the client's authentication tokens.

##`T.stream(path, [params])`
Use this with the Streaming API.

**path**

Streaming endpoint to hit. One of:

- **'statuses/filter'**
- **'statuses/sample'**
- **'statuses/firehose'**
- **'user'**
- **'site'**

For a description of each Streaming endpoint, see the [Twitter API docs](https://dev.twitter.com/docs/api/1.1#334).

**params**

(Optional) parameters for the request. Any Arrays passed in `params` get converted to comma-separated strings, allowing you to do requests like:

```javascript
//
// I only want to see tweets about my favorite fruits
//

// same result as doing { track: 'bananas,oranges,strawberries' }
var stream = T.stream('statuses/filter', { track: ['bananas', 'oranges', 'strawberries'] })

stream.on('tweet', function (tweet) {
  //...
})
```

# Using the Streaming API

`T.stream(path, [params])` keeps the connection alive, and returns an `EventEmitter`.

The following events are emitted:

##event: 'tweet'

Emitted each time a status (tweet) comes into the stream.

```javascript
stream.on('tweet', function (tweet) {
  //...
})
```

##event: 'delete'

Emitted each time a status (tweet) deletion message comes into the stream.

```javascript
stream.on('delete', function (deleteMessage) {
  //...
})
```

##event: 'limit'

Emitted each time a limitation message comes into the stream.

```javascript
stream.on('limit', function (limitMessage) {
  //...
})
```

##event: 'scrub_geo'

Emitted each time a location deletion message comes into the stream.

```javascript
stream.on('scrub_geo', function (scrubGeoMessage) {
  //...
})
```

##event: 'disconnect'

Emitted when a disconnect message comes from Twitter. This occurs if you have multiple streams connected to Twitter's API. Upon receiving a disconnect message from Twitter, `Twit` will close the connection and emit this event with the message details received from twitter.

```javascript
stream.on('disconnect', function (disconnectMessage) {
  //...
})
```

##event: 'connect'

Emitted when a connection attempt is made to Twitter. The http `request` object is emitted.

```javascript
stream.on('connect', function (request) {
  //...
})
```

##event: 'connected'

Emitted when the response is received from Twitter. The http `response` object is emitted.

```javascript
stream.on('connected', function (response) {
  //...
})
```

##event: 'reconnect'

Emitted when a reconnection attempt to Twitter is scheduled. If Twitter is having problems or we get rate limited, we schedule a reconnect according to Twitter's [reconnection guidelines](https://dev.twitter.com/docs/streaming-apis/connecting). The last http `request` and `response` objects are emitted, along with the time (in milliseconds) left before the reconnect occurs.

```javascript
stream.on('reconnect', function (request, response, connectInterval) {
  //...
})
```

##event: 'warning'

This message is appropriate for clients using high-bandwidth connections, like the firehose. If your connection is falling behind, Twitter will queue messages for you, until your queue fills up, at which point they will disconnect you.

```javascript
stream.on('warning', function (warning) {
  //...
})
```

##event: 'status_withheld'

Emitted when Twitter sends back a `status_withheld` message in the stream. This means that a tweet was withheld in certain countries.

```javascript
stream.on('status_withheld', function (withheldMsg) {
  //...
})
```

##event: 'user_withheld'

Emitted when Twitter sends back a `user_withheld` message in the stream. This means that a Twitter user was withheld in certain countries.

```javascript
stream.on('user_withheld', function (withheldMsg) {
  //...
})
```

##event: 'friends'

Emitted when Twitter sends the ["friends" preamble](https://dev.twitter.com/docs/streaming-apis/messages#User_stream_messages) when connecting to a user stream. This message contains a list of the user's friends, represented as an array of user ids.

```javascript
stream.on('friends', function (friendsMsg) {
  //...
})
```

##event: 'direct_message'

Emitted when a direct message is sent to the user. Unfortunately, Twitter has not documented this event for user streams.

```javascript
stream.on('direct_message', function (directMsg) {
  //...
})
```

##event: 'user_event'

Emitted when Twitter sends back a [User stream event](https://dev.twitter.com/docs/streaming-apis/messages#User_stream_messages).
See the Twitter docs for more information on each event's structure.

```javascript
stream.on('user_event', function (eventMsg) {
  //...
})
```

In addition, the following user stream events are provided for you to listen on:

* `blocked`
* `unblocked`
* `favorite`
* `unfavorite`
* `follow`
* `unfollow`
* `user_update`
* `list_created`
* `list_destroyed`
* `list_updated`
* `list_member_added`
* `list_member_removed`
* `list_user_subscribed`
* `list_user_unsubscribed`
* `unknown_user_event` (for an event that doesn't match any of the above)

###Example:

```javascript
stream.on('favorite', function (event) {
  //...
})
```

##event: 'error'

Emitted when an API request or response error occurs.
An `Error` object is emitted, with properties:

```js
{
  message:      '...',  // error message
  statusCode:   '...',  // statusCode from Twitter
  code:         '...',  // error code from Twitter
  twitterReply: '...',  // raw response data from Twitter
  allErrors:    '...'   // array of errors returned from Twitter
}
```

##stream.stop()

Call this function on the stream to stop streaming (closes the connection with Twitter).

##stream.start()

Call this function to restart the stream after you called `.stop()` on it.
Note: there is no need to call `.start()` to begin streaming. `Twit.stream` calls `.start()` for you.

-------

#What do I have access to?

Anything in the Twitter API:

* REST API Endpoints:       https://dev.twitter.com/docs/api
* Public stream endpoints:  https://dev.twitter.com/docs/streaming-api/methods
* User stream endpoints:    https://dev.twitter.com/docs/streaming-api/user-streams
* Site stream endpoints:    https://dev.twitter.com/docs/streaming-api/site-streams

-------

Go here to create an app and get OAuth credentials (if you haven't already): https://dev.twitter.com/apps/new


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

![iRTD2](http://dl.dropbox.com/u/32773572/RTD2_logo.png)

The example is a twitter bot named [RTD2](https://twitter.com/#!/iRTD2) written using `twit`. RTD2 tweets about **github** and curates its social graph.

-------

## Changelog

###0.1.0

