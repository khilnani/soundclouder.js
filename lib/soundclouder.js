//--------------------------------------------

var https = require('https'),
	qs = require('querystring'),
	log = require("dysf.utils").logger,
	sc = exports;
	
var inited = false;

//--------------------------------------------

var host_api = "api.soundcloud.com",
	host_connect = "https://soundcloud.com/connect",
	client_id = "",
	client_secret = "",
	redirect_uri = "";
	
function isInited()
{
	if(inited == false)
	{
		log.warn("soundclouder.auth() Not inited!");
		callback({'message' : "SoundClouder not inited!"});
	}
	return inited;
}
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
	if( isInited() )
	{
	
		var post_data = qs.stringify({  
			'client_id' : client_id,  
			'client_secret': client_secret,
			'grant_type': 'authorization_code',
			'redirect_uri': redirect_uri,
			'code': code
		}); 
		
		var post_options = {  
			host: host_api,  
			path: '/oauth2/token',  
			method: 'POST',  
			headers: {  
				'Content-Type': 'application/x-www-form-urlencoded',  
				'Content-Length': post_data.length  
			}  
		};  
		  
		var req = https.request(post_options, function(res) {  
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

function call (method, path, oauth_token, params, callback) {
	if(path && path.indexOf('/') == 0)
	{
		if( typeof(params) == 'function' )
		{
			callback = params;
			params = {};
		}
		callback = callback || function() {};
		params = params || {};
		params.oauth_token = oauth_token;
		params.format = 'json';
		return request({method: method, uri: host_api, path: path, qs: params}, callback);
	}
	else
	{
		callback({message: 'Invalid path: ' + path});
		return false;
	}
}

/* Make an API call
 *
 * @param {String} path
 * @param {Object} params
 * @param {Function} callback(error, data)
 * @return {Request}
 */
sc.get = function(path, oauth_token, params, callback) {
	call('GET', path, oauth_token, params, callback);
}

sc.post = function(path, oauth_token, params, callback) {
	call('POST', path, oauth_token, params, callback);
}

sc.put = function(path, oauth_token, params, callback) {
	call('PUT', path, oauth_token, params, callback);
}

sc.delete = function(path, oauth_token, params, callback) {
	call('DELETE', path, oauth_token, params, callback);
}

//--------------------------------------------

function request ( data, callback )
{

  	var options = {
  		hostname: data.uri,
  		path: data.path + '?' + qs.stringify(data.qs),
  		method: data.method
  	};
  	
  	log.debug("Attempting Request: " + options.method + '; ' + options.hostname + options.path);
  	
  	var req = https.request(options, function (response) {
  		log.debug("Request executed: " + options.method + '; ' + options.hostname + options.path);
  		log.trace("Response http code: " + response.statusCode);
  		log.trace("Response headers: " + JSON.stringify(response.headers));
  		
  		var body = "";
  		response.on('data', function(chunk) {
  			body += chunk;
  			//log.trace("chunk: " + chunk);
  		});
  		response.on('end', function() {
  			log.trace("Response body: \n" + body);
  			var d = JSON.parse(body);
  			if(d.error)
  			{
  				callback({message: d.error });
  			}
  			else
  			{
  				callback(null, d);
  			}
  		});
	});
	
	req.on('error', function(e) {
	  	log.error("For Request: " + options.method + '; ' + options.hostname + options.path);
  		log.error("Request error: " + e.message);  
  		callback(e);	
  	});
  	
  	req.end();
}
  	  	
  	  	


