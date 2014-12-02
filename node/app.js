//Require Modules 
var express = require('express');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var extend = require('util')._extend;
var https = require('https');
var url = require('url');

//Require Custom Modules
var flatten = require('./flatten');




//SetUp Middelware
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




//Render Index HTML
app.get('/', function(req, res){
    res.render('index');
});




//Get App Info 
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");


//Include Watson Service Server Credentials
var service_url = 'insert_service_url';
var service_username = 'insert_service_username';
var service_password = 'insert_service_password';

//Get Service Info
if (process.env.VCAP_SERVICES) {
    var services = JSON.parse(process.env.VCAP_SERVICES);
    var service_name = 'user_modeling';
  
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

//Create Auth Token
var auth = 'Basic ' + new Buffer(service_username + ':' + service_password).toString('base64');




//Setup Server
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 8080);




//Require Socket.IO, Start The Server 
var io = require('socket.io').listen(app.listen(port, host));
console.log('App started on port ' + port);





//Start Socket Connection
io.on('connection', function(socket){
    console.log('user connected');


    //On Message from Client 
    socket.on('chat message', function(msg){


        //Get Coordinate Rectangle For Twitter
        var lat = msg.coordinates.k;            
        var lon = msg.coordinates.B;    
        var x = lat;
        var y = lon;
        var distance = 0;

        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
            var R = 6371; 
            var dLat = (lat2-lat1)* (Math.PI/180); 
            var dLon = (lon2-lon1)* (Math.PI/180);  
            var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos((lat1)* (Math.PI/180)) * Math.cos((lat2)* (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; 

            distance = d;
            x += 0.0001;
            y += 0.0001;
        }

        do {
            getDistanceFromLatLonInKm(lat,lon,x, y);
            if (distance > 25){
                twitterFeed();
            }
        } while (distance < 25);


        //Call Twitter with Strings
        function twitterFeed(){
            var dx = x - lat;
            var dy = y - lon;
            var x_ = lat - dx;
            var y_ = lon - dy;
            var locationString = x_ + ',' + y_ + ',' + x + ',' + y;
            var reversedLocationString = '' + y_ + ',' + x_ + ',' + y + ',' + x + '';
            console.log('Location for: ' + reversedLocationString);


            //Setup Twitter
            var twit = require('twitter');
            var twitter = new twit({
                consumer_key: 'insert_consumer_key',
                consumer_secret: 'insert_consumer_secret',
                access_token_key: 'insert_access_token_key',
                access_token_secret: 'insert_access_token_secret'
            });

            var textToWatson;
            var words_count = 0;
            twitter.stream('filter', {locations: reversedLocationString}, function(stream){
                stream.on('data', function(data){
                    //console.log(data.user.name);
                    //console.log(data.text);
                    //console.log(data.coordinates);


                    //Text Parser for Tweets
                    var str = data.text;
                    var words = str.split(/\s+/);
                    var line = "";
                    var first = 1;
                    for(j = 0; j < words.length; ++j) {
                        var word=words[j];
                        if(word.match(/^\&\S+\;$/)) { continue; }
                        if(word.match(/^[a-zA-Z0-9_\(\)\@\#\.\+\-\?\!\:\\\/\;\&\"]+$/)) {
                            if(!first) {
                                line+=" ";
                            }
                            line+=word;
                            first=0;
                            words_count++;
                        }
                    }
                    textToWatson += line + '';


                    //Send Tweets to Watson
                    if (words_count > 150) {
                        words_count = 0;
                        console.log('Called Watson');


                        //Start Watson Service
                        var parts = url.parse(service_url.replace(/\/$/,''));
                        var profile_options = { 
                            host: parts.hostname,
                            port: parts.port,
                            path: parts.pathname + "/api/v2/profile",
                            method: 'POST',
                            headers: {
                              'Content-Type'  :'application/json',
                              'Authorization' :  auth }
                            };
                            
                        //For presentation start commenting here  
                        
                        //Create a profile request with the text and the https options and call it
                        create_profile_request(profile_options,textToWatson)(function(error,profile_string) {
                            if (error) console.log(error.message);
                            else {
                                //Parse the Profile and format it
                                var profile_json = JSON.parse(profile_string);
                                var flat_traits = flatten.flat(profile_json.tree);

                                //Sent Watson Data to Client
                                var watsonObj = {
                                    id: msg.id,
                                    watsonJSON: flat_traits
                                }


                                //Send Watson Data to Client
                                socket.emit('watson message', watsonObj);
                                //console.log(flat_traits);
                            }
                        }); //For presentation stop commenting here 
                        
                    }


                    //Send Twitter Data to Client
                    if (data.geo != null){
                        var twitterObj = {
                            text: data.text,
                            name: data.user.name,
                            coordinates: data.coordinates
                        }
                        socket.emit('chat message', twitterObj);
                    }
                }); 

                
                //On Disconnect stop Stream
                socket.on('disconnect', function () {
                    stream. destroy();
                    console.log('user disconnected');
                });
            });
        }
    });
});


//For presentation start delete this section

//Function you will find in the User Modeling documentation
var create_profile_request = function(options,content) {
  return function (/*function*/ callback) {
    // create the post data to send to the User Modeling service
    var post_data = {
      'contentItems' : [{ 
        'userid' : 'dummy',
        'id' : 'dummyUuid',
        'sourceid' : 'freetext',
        'contenttype' : 'text/plain',
        'language' : 'en',
        'content': content
      }]
    };
    // Create a request to POST to the User Modeling service
    var profile_req = https.request(options, function(result) {
      result.setEncoding('utf-8');
      var response_string = '';

      result.on('data', function(chunk) {
        response_string += chunk;
      });
      
      result.on('end', function() {

        if (result.statusCode != 200) {
          var error = JSON.parse(response_string);
          callback({'message': error.user_message}, null);
        } else
          callback(null,response_string);
      });
    });
  
    profile_req.on('error', function(e) {
      callback(e,null);
    });

    profile_req.write(JSON.stringify(post_data));
    profile_req.end();
  }
};

//For presentation stop deleting this section