//--------------------------------------------

var http = require('http'),
	qs = require('querystring'),
	log = require("dysf.utils").logger,
	sc = exports;
	
var inited = false;

//--------------------------------------------

var host = "api.soundcloud.com",
	host_connect = "https://soundcloud.com/connect",
	client_id = "",
	client_secret = "",
	redirect_uri = "";
	
//--------------------------------------------

/* Initialize with client id, client secret and redirect url.
 *
 * @param {String} client_id
 * @param {String} client_secret
 * @param {String} redirect_uri
 */
sc.init = function (_client_id, _client_secret, _redirect_uri)
{
	inited = true;
	client_id = _client_id;
	client_secret = _client_secret;
	redirect_uri = _redirect_uri;
}

/* Get the url to SoundCloud's authorization/connection page.
 *
 * @param {Object} options
 * @return {String}
 */
sc.connectUrl = function (options) 
{
	return host_connect + '?' + (options ? qs.stringify(options) : '');
}

/* Perform authorization with SoundCLoud and obtain OAuth token needed 
 * for subsequent requests.
 *
 * @param {String} code
 * @param {Function} callback(error, access_token) No token returned if error != null
 */
sc.auth = function (code, callback)
{
	if(inited == false)
	{
		log.warn("soundclouder.auth() Not inited!");
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
			log.trace('soundclouder.auth() Status: ' + res.statusCode);
			log.trace('soundclouder.auth() Headers: ' + JSON.stringify(res.headers));
		 
			var data = "";
			res.on('data', function (chunk) {
				data += chunk;
				log.trace('soundclouder.auth() Chunk: ' + chunk);  
			});  
			res.on('end', function () {
				log.trace('soundclouder.auth() Response: ' + data);
				var d = JSON.parse(data);
				if(d.error)
				{
					callback( {message: d.error} );
				}
				else
				{
					log.info('soundclouder.auth() access_token:' + d.access_token);
					callback(null, d.access_token);
				}
			});
		});
		
		req.on('error', function(e) {
		  log.error('soundclouder.auth() error: ' + e.message);
		  callback(e);
		});
		  
		// write parameters to post body  
		req.write(post_data);  
		req.end();  
	}
	
}


/* Does an API call to facebook and callbacks
 * when the result is available.
 *
 * @param {String} method
 * @param {String} path
 * @param {Object} params
 * @param {Function} callback
 * @return {Request}
 */
CLIENT.apiCall = function(method, path, params, callback) {
    callback = callback || function() {};
    return request({method: method, uri: _soundcloud_api_url + path + '?' + querystring.stringify(params), json:true}, callback);
};

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

