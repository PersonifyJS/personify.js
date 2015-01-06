var assert = require('assert');
var should = require('should');// https://github.com/tj/should.js
var Watson = require('../util/watson');

describe('Watson config', function(){

  it('Watson should be a class', function(){
    (Watson).should.be.type('function');
  });

  // to move config in a different file <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  it('Watson class should have methods', function(){
    var watson = new Watson({
    service_url: "https://gateway.watsonplatform.net/systemu/service/",
    service_username: "12312a68-fdff-4064-9928-eb088a960815",
    service_password: "KUwy0neR5kpV"
},
{
    consumer_key:         'nnnMzv63aJKbQgzF77vQLXCm0',
    consumer_secret:      'BAG1XL3PHUVw6AsW7K0dRcIv6qkITkWARmZL9Bb8nOKfTkbTpo',
    access_token:         '35398491-9KTshSy7QNiKh0Ia71AeZ6D1XMg6teKJWAwp6YNNE',
    access_token_secret:  'ivIGOcV4OHxW9lRrW7pevEcxwtk2RDGzVSW6IdOqz9R0D'

});
    (watson).should.be.an.instanceof(Watson);
    (watson.user).should.be.type('function');

  });

  it('watson should throw an error when no config is passed', function(done){
    assert.throws(function(){
      var watson = new Watson({});
    }, Error)
    done();
  });
});