//Personify.js
//For more information, visit http://personifyjs.github.io.
//Created by Essam Al Joubori, Rohan Agrawal, Phil Elauria
//Copyright 2014 - 2015 ssam Al Joubori, Rohan Agrawal, Phil Elauria 
//For user under the MIT license

var assert = require('assert');
var should = require('should');// https://github.com/tj/should.js
var Personify = require('../util/twitter');
var config = require('./config');

describe('Personify config is working', function(){

  it('Personify should be a class', function(){
    (Personify).should.be.type('function');
  });

  it('Personify class should have methods', function(){
    var personify = new Personify(config);
    (personify).should.be.an.instanceof(Personify);
    (personify.userPersonify).should.be.type('function');
    (personify.homePersonify).should.be.type('function');
    (personify.searchPersonify).should.be.type('function');
    (personify.userTranslate).should.be.type('function');
    (personify.homeTranslate).should.be.type('function');
    (personify.searchTranslate).should.be.type('function');
    (personify.streamTranslate).should.be.type('function');
  });

  it('personify should throw an error when no config is passed', function(done){
    assert.throws(function(){
      var personify = new Personify({});
    }, Error);
    done();
  });  

});

describe('All methods are working', function(){


  it('personify.userPersonify function should work', function(done){ 
    var personify = new Personify(config);
    personify.userPersonify({screen_name: '@essamio'}, function(data, err) {
      if(err) throw err;
      done();
    }); 
  });

  it('personify.homePersonify function should work', function(done){ 
    var personify = new Personify(config);
    personify.homePersonify('@test', function(data, err) {
      if(err) throw err;
      done();
    }); 
  });

  it('personify.searchPersonify function should work', function(done){ 
    var personify = new Personify(config);
    personify.searchPersonify({ 
            q: '#nike', 
            count: 100,
            fromLanguage: 'fr', 
            toLanguage: 'en', 
            outputType: 'text' 
          }, function(data, err) {
      if(err) throw err;
      done();
    });
  });

});


describe('Personify methods functionality', function(){


  it('personify.homePersonify function should work without params', function(done){
    var personify = new Personify(config);
    personify.homePersonify({}, function(data, err){
      assert.equal(err, null);
      done();
    });
  });

  it('personify.searchPersonify function should accept geocodes as a string', function(done){
    var personify = new Personify(config);
    personify.searchPersonify({q: '#nike', geocode: 'NY'}, function(data, err){
      assert.equal(err, null);
      done();
    });
  });

   it('personify.searchPersonify function should accept custom geocodes arrays', function(done){
    var personify = new Personify(config);
    personify.searchPersonify({q: '#nike', geocode: ['37.764799', '-122.46299']}, function(data, err){
      err.should.be.ok;
      done();
    });
  });
});