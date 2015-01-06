var assert = require('assert');
var should = require('should');// https://github.com/tj/should.js
var Personify = require('../util/personify');
var config = require('./config');

describe('Personify config', function(){

  it('Personify should be a class', function(){
    (Personify).should.be.type('function');
  });

  it('Personify class should have methods', function(){
    var personify = new Personify(config.personify, config.twitter);
    (personify).should.be.an.instanceof(Personify);
    (personify.user).should.be.type('function');
    (personify.userHome).should.be.type('function');
    (personify.searchGeo).should.be.type('function');
    (personify.searchTweets).should.be.type('function');
    // Add more functions
  });

  it('personify should throw an error when no config is passed', function(done){
    assert.throws(function(){
      var personify = new Personify({});
    }, Error);
    done();
  });  

});

describe('personify methods', function(){


  it('personify.user function should work', function(done){ 
    var personify = new Personify(config.personify, config.twitter);
    personify.user('@test', function(data, err) {
      if(err) throw err;
      done();
    }); 
  });

  it('personify.userHome function should work without passing params', function(done){
    var personify = new Personify(config.personify, config.twitter);
    personify.userHome(function(data, err) {
      if(err) throw err;
      done();
    });
  });

  it('personify.userHome function should work with params', function(done){
    var personify = new Personify(config.personify, config.twitter);
    personify.userHome(function(data, err){
      if(err) throw err;
      done();
    }, {count:200});
  });

  it('personify.userHome function should work with more than one params', function(done){
    var personify = new Personify(config.personify, config.twitter);
    personify.userHome(function(data, err){
      if(err) throw err;
      done();
    }, {count:200, lang: 'en'});
  });

  it('personify.searchGeo function should throw error when no params are passed', function(done){
    var personify = new Personify(config.personify, config.twitter);
    personify.searchGeo(function(data, err){
      done();
      err.should.be.ok;
    });
  });

  it('personify.searchGeo function should work with no error when `q` params is passed', function(done){
    var personify = new Personify(config.personify, config.twitter);
    personify.searchGeo(function(data, err){
      done();
      (err === null).should.be.true;
    }, '#nike');
  });

  it('personify.searchGeo function should work with no error when `q` params is passed along with geocode params', function(done){
    var personify = new Personify(config.personify, config.twitter);
    personify.searchGeo(function(data, err){
      done();
      (err === null).should.be.true;
    }, '#nike', 'NY');
  });

  it('personify.searchGeo function should search any given geocode params', function(done){
    var personify = new Personify(config.personify, config.twitter);
    personify.searchGeo(function(data, err){
      done();
      (err === null).should.be.true;
    }, '#nike', ['19.416619', '-99.135705', '100mi']);
  });
});