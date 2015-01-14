//Personify.js
//For more information, visit http://personifyjs.github.io.
//Created by Essam Al Joubori, Rohan Agrawal, Phil Elauria
//Copyright 2014 - 2015 ssam Al Joubori, Rohan Agrawal, Phil Elauria 
//For user under the MIT license

var assert = require('assert');
var should = require('should');// https://github.com/tj/should.js
var Personify = require('../util/twitter');
var config = require('./config');

describe('translation methods should work', function(){

//   it('personify.userTranslate function should work', function(done){ 
//     var personify = new Personify(config);
//     personify.userTranslate({ 
//             screen_name: 'fr332th1nk', 
//             count: 100,
//             fromLanguage: 'fr', 
//             toLanguage: 'en', 
//             outputType: 'text' 
//           }, function(data, err) {
//       assert.equal(err, null);
//       done();
//     }); 
//   });

//   it('personify.homeTranslate function should work', function(done){ 
//     var personify = new Personify(config);
//     personify.homeTranslate({ 
//             count: 100,
//             fromLanguage: 'fr', 
//             toLanguage: 'en', 
//             outputType: 'text' 
//           }, function(data, err) {
//       assert.equal(err, null);
//       done();
//     }); 
//   });

//   it('personify.searchTranslate function should work', function(done){ 
//     var personify = new Personify(config);
//     personify.searchTranslate({
//             q: '#nike', 
//             count: 100,
//             fromLanguage: 'fr', 
//             toLanguage: 'en', 
//             outputType: 'text' 
//           }, function(data, err) {
//       assert.equal(err, null);
//       done();
//     }); 
//   });
  
//   // uncomment that when you want to test this. Twitter stream will 
//   // call done() multiple times
//   it('personify.streamTranslate function should work', function(done){ 
//     var personify = new Personify(config);
//     personify.streamTranslate({ track: '#jesuischarlie', 
//                 fromLanguage: 'es', 
//                 toLanguage: 'en', 
//                 outputType: 'text',
//               }, function(data, err) {
//       assert.equal(err, null);
//     }); 
//     done();
//   });
// });

// describe('translation methods functionality', function(){

//   it('personify.userTranslate function should work with the right params', function(done){
//     var personify = new Personify(config);
//     var params =  { q: 'charlie',
//                     fromLanguage: 'es',
//                     toLanguage: 'en',
//                     outputType: 'text'
//                   };
//     personify.userTranslate(params, function(data, err){
//       assert.equal(err, null);
//       done();
//     });
//   });

  // it('personify.userTranslate function should translate from fr to en', function(done){
  //   var personify = new Personify(config);
  //   var params =  { q: 'charlie',
  //                   fromLanguage: 'fr',
  //                   toLanguage: 'en',
  //                   outputType: 'text'
  //                 };
  //   personify.userTranslate(params, function(data, err){
  //     assert.equal(err, null);
  //     done();
  //   });
  // });

  // it('personify.userTranslate function should translate from fr to ar', function(done){
  //   var personify = new Personify(config);
  //   var params =  { q: 'charlie',
  //                   fromLanguage: 'fr',
  //                   toLanguage: 'ar',
  //                   outputType: 'text'
  //                 };
  //   personify.userTranslate(params, function(data, err){
  //     assert.equal(err, null);
  //     done();
  //   });
  // });

  // it('personify.homeTranslate function should work with params', function(done){
  //   var personify = new Personify(config);
  //   var params =  { q: 'charlie',
  //                   fromLanguage: 'fr',
  //                   toLanguage: 'ar',
  //                   outputType: 'text'
  //                 };
  //   personify.homeTranslate(params, function(data, err){
  //     assert.equal(err, null);
  //     done();
  //   });
  // });

  // it('personify.homeTranslate function should work without params `q`', function(done){
  //   var personify = new Personify(config);
  //   var params =  {  
  //                   fromLanguage: 'fr',
  //                   toLanguage: 'ar',
  //                   outputType: 'text'
  //                 };
  //   personify.homeTranslate(params, function(data, err){
  //     assert.equal(err, null);
  //     done();
  //   });
  // });


  // it('personify.searchTranslate function should Not work without params `q`', function(done){
  //   var personify = new Personify(config);
  //   var params =  { // no params `q`
  //                   fromLanguage: 'fr',
  //                   toLanguage: 'ar',
  //                   outputType: 'text'
  //                 };
  //   personify.searchTranslate(params, function(data, err){
  //     err.should.be.ok;
  //     done();
  //   });
  // }); 

  // it('personify.streamTranslate function should Not work without params `track`', function(done){
  //   var personify = new Personify(config);
  //   var params =  { 
  //                   fromLanguage: 'fr',
  //                   toLanguage: 'ar',
  //                   outputType: 'text'
  //                 };

  //   personify.streamTranslate(params, function(data, err){
  //     err.should.be.ok;
  //     done();
  //   });
  // });

});


