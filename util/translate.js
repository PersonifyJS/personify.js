var https = require('https');
var url = require('url');
var querystring = require('querystring');

//module.exports.translate parameters info
//language: enus, frfr, arar, ptbr, eses 
//outputType: txt, json, xml

var translate = function(authenticate, data, language, outputType, callback){

// defaults for dev outside bluemix
var service_url = authenticate.translateConfig.service_url;
var service_username = authenticate.translateConfig.service_username;
var service_password = authenticate.translateConfig.service_password;

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
if (process.env.VCAP_SERVICES) {
  console.log('Parsing VCAP_SERVICES');
  var services = JSON.parse(process.env.VCAP_SERVICES);
  //service name, check the VCAP_SERVICES in bluemix to get the name of the services you have
  var service_name = 'machine_translation';
<<<<<<< HEAD
  
  if (services[service_name]) {
    var svc = services[service_name][0].credentials;
    service_url = svc.url;
    service_username = svc.username;
    service_password = svc.password;
  } else {
    console.log('The service '+service_name+' is not in the VCAP_SERVICES, did you forget to bind it?');
  }

} else {
  console.log('No VCAP_SERVICES found in ENV, using defaults for local development');
}

console.log('service_url = ' + service_url);
console.log('service_username = ' + service_username);
console.log('service_password = ' + new Array(service_password.length).join("X"));

var auth = 'Basic ' + new Buffer(service_username + ':' + service_password).toString('base64');

  var request_data = { 
    'txt': "hola hola", 
    'sid': 'mt-eses-enus',
    'rt': 'text' // return type e.g. json, text or xml
  };
  console.log('request_data', request_data)

  var parts = url.parse(service_url);
  // create the request options to POST our question to Watson
  var options = { host: parts.hostname,
    port: parts.port,
    path: parts.pathname,
    method: 'POST',
    headers: {
      'Content-Type'  :'application/x-www-form-urlencoded', // only content type supported
      'X-synctimeout' : '30',
      'Authorization' :  auth }
  };


  var watson_req = https.request(options, function(result) {
    result.setEncoding('utf-8');
    var responseString = '';

    result.on("data", function(chunk) {
      responseString += chunk;
    });
    
    result.on('end', function() {
      // add the response to the request so we can show the text and the response in the template
      request_data.translation = responseString;
      console.log('request',request_data);
      callback(request_data);
    })

  });

  watson_req.on('error', function(e) {
    return res.render('index', {'error': e.message})
  });

  // create the request to Watson
  watson_req.write(querystring.stringify(request_data));
  watson_req.end();

}



