//--------------------------------------------

var http = require('http'),
	qs = require('querystring'),
	log = require("dysf.utils").logger,
	sc = exports;
	
var inited = false;

//--------------------------------------------

var host = "api.soundcloud.com",
	client_id = "",
	client_secret = "",
	redirect_uri = "",
	code = "",
	access_token = "";
	
//--------------------------------------------

	
sc.accesstoken = function () 
{
	return access_token;
}
	
//--------------------------------------------

sc.init = function (_client_id, _client_secret, _redirect_uri)
{
	inited = true;
	client_id = _client_id;
	client_secret = _client_secret;
	redirect_uri = _redirect_uri;
}

sc.auth = function (code, callback)
{
	if(inited == false)
	{
		log.warn("SoundClouder not inited!");
		callback({'message' : "SoundClouder not inited!"});
	}
	else
	{
	
		var post_data = qs.stringify({  
			'client_id' : client_id,  
			'client_secret': client_secret,
			'grant_type': 'authorization_code',
			'redirect_uri': redirect_uri,
			'code': code
		}); 
		
		var post_options = {  
			host: host,  
			path: '/oauth2/token',  
			method: 'POST',  
			headers: {  
				'Content-Type': 'application/x-www-form-urlencoded',  
				'Content-Length': post_data.length  
			}  
		};  
		  
		var req = http.request(post_options, function(res) {  
			res.setEncoding('utf8');  
			log.trace('STATUS: ' + res.statusCode);
			log.trace('HEADERS: ' + JSON.stringify(res.headers));
		 
			var data = "";
			res.on('data', function (chunk) {
				data += chunk;
				log.trace('Chunk: ' + chunk);  
			});  
			res.on('end', function () {
				log.trace('Response: ' + data);
				var d = JSON.parse(data);
				if(d.error)
				{
					callback( {message: d.error} );
				}
				else
				{
					access_token = d.access_token;
					log.info('access_token:' + access_token);
					callback();
				}
			});
		});
		
		req.on('error', function(e) {
		  log.error('Problem with request: ' + e.message);
		  callback(e);
		});
		  
		// write parameters to post body  
		req.write(post_data);  
		req.end();  
	}
	
}

//--------------------------------------------


/*

https://api.soundcloud.com/me?oauth_token=1-29132-29620504-81f1b9e89cc339d&format=json&_status_code_map[302]=200


  	var options = {
  		hostname: 'google.com'
  	};
  	
  	util.log("calling: " + options.hostname);
  	
  	var req = http.get(options, function (response) {
  		util.log("http code: " + response.statusCode);
  		util.log("http code: " + JSON.stringify(response.headers));
  		
  		var data = "";
  		response.on('data', function(chunk) {
  			data += chunk;
  			util.log("chunk: " + chunk);
  		});
  		response.on('end', function() {
  			util.log("ended.");
  			util.log("--------------");
  			util.log("final data: \n" + data);
  			util.log("--------------");
  		});
	});
	
	req.on('error', function(e) {
  		util.log("http error: " + e.message);  	
  	});
  	  	
  	  	
*/

