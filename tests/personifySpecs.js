var assert = require('assert');
var should = require('should');// https://github.com/tj/should.js
var Personify = require('../util/twitter');
var config = require('./config');

describe('Personify config', function(){

  it('Personify should be a class', function(){
    (Personify).should.be.type('function');
  });

  it('Personify class should have methods', function(){
    var personify = new Personify(config);
    (personify).should.be.an.instanceof(Personify);
    (personify.user).should.be.type('function');
    (personify.userHome).should.be.type('function');
    (personify.searchTweets).should.be.type('function');
    (personify.translate).should.be.type('function');
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
    var personify = new Personify(config);
    personify.user('@test', function(data, err) {
      if(err) throw err;
      done();
    }); 
  });

  it('personify.userHome function should work without passing params', function(done){
    var personify = new Personify(config);
    personify.userHome(function(data, err) {
      done();
    });
  });

  it('personify.userHome function should work with params', function(done){
    var personify = new Personify(config);
    personify.userHome({count:200}, function(data, err){
      if(err) throw err;
      done();
    });
  });

  it('personify.userHome function should work with more than one params', function(done){
    var personify = new Personify(config);
    personify.userHome({count:200, lang: 'en'}, function(data, err){
      if(err) throw err;
      done();
    });
  });

  it('personify.searchTweets function should search any given params', function(done){
    var personify = new Personify(config);
    personify.searchTweets({ q: "#nike", count: 100 }, function(data, err){
      done();
      (err === null).should.be.true;
    });
  });

  it('personify.searchTweets function should accept geocode params', function(done){
    var personify = new Personify(config);
    personify.searchTweets({ q: "#nike", count: 100, geocode: "NY" }, function(data, err){
      done();
      (err === null).should.be.true;
    });
  });

  it('personify.searchTweets function should NOT accept random geocode params', function(done){
    var personify = new Personify(config);
    personify.searchTweets({ q: "#nike", count: 100, geocode: "XY" }, function(data, err){
      (err).should.be.ok;
      done();
    });
  });
  
});

describe('translation methods', function(){

  it('personify.translate function should work with the right params', function(done){
    var personify = new Personify(config);
    var params =  { q: 'charlie',
                    fromLanguage: 'es',
                    toLanguage: 'en',
                    outputType: 'text'
                  };
    personify.translate(params, function(data, err){
      (err === null).should.be.true;
      done();
    });
  });

  it('personify.translate function should raise an error without the right params', function(done){
    var personify = new Personify(config);
    var params =  { q: 'charlie',
                    fromLanguage: 'blahblah',
                    toLanguage: 'en',
                    outputType: 'blahblah'
                  };
    personify.translate(params, function(data, err){
      (err).should.be.ok;
      done();
    });
  });
});