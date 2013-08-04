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

//--------------------------------------------

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

//--------------------------------------------

/* get the client id, client secret and redirect url.
 *
 */
sc.getConfig = function ()
{
	var o = {
		'client_id': client_id,
		'client_secret': client_secret,
		'redirect_uri': redirect_uri
	}
	return o;
}

//--------------------------------------------

/* Get the url to SoundCloud's authorization/connection page.
 *
 * @param {Object} options
 * @return {String}
 */
sc.getConnectUrl = function (options) 
{
	return host_connect + '?' + (options ? qs.stringify(options) : '');
}

//--------------------------------------------

/* Perform authorization with SoundCLoud and obtain OAuth token needed 
 * for subsequent requests. See http://developers.soundcloud.com/docs/api/guide#authentication
 *
 * @param {String} code sent by the browser based SoundCloud Login that redirects to the redirect_uri

 * @param {Function} callback(error, access_token) No token returned if error != null
 */
sc.auth = function (code, callback)
{
	if( isInited() )
	{
		var options = {  
			uri: host_api,  
			path: '/oauth2/token',  
			method: 'POST', 
			qs: {  
				'client_id' : client_id,  
				'client_secret': client_secret,
				'grant_type': 'authorization_code',
				'redirect_uri': redirect_uri,
				'code': code
			}
		};  
		  
		request(options, function(error, data) {  
				if(error)
				{
					log.error('soundclouder.auth() error:' + error.message);
					callback( error);
				}
				else
				{
					log.info('soundclouder.auth() access_token:' + data.access_token);
					callback(null, data.access_token);
				}
		});
	}
}

//--------------------------------------------

/* Make an API call
 *
 * @param {String} path
 * @param {String} access_token
 * @param {Object} params
 * @param {Function} callback(error, data)
 * @return {Request}
 */
sc.get = function(path, access_token, params, callback) {
	call('GET', path, access_token, params, callback);
}

sc.post = function(path, access_token, params, callback) {
	call('POST', path, access_token, params, callback);
}

sc.put = function(path, access_token, params, callback) {
	call('PUT', path, access_token, params, callback);
}

sc.delete = function(path, access_token, params, callback) {
	call('DELETE', path, access_token, params, callback);
}

//--------------------------------------------


function call (method, path, access_token, params, callback) {
	if(path && path.indexOf('/') == 0)
	{
		if( typeof(params) == 'function' )
		{
			callback = params;
			params = {};
		}
		callback = callback || function() {};
		params = params || {};
		params.oauth_token = access_token;
		params.format = 'json';
		return request({method: method, uri: host_api, path: path, qs: params}, callback);
	}
	else
	{
		callback({message: 'Invalid path: ' + path});
		return false;
	}
}

//--------------------------------------------


function request ( data, callback )
{	
	var qsdata = (data.qs) ? qs.stringify(data.qs) : '';
  	var options = {
  		hostname: data.uri,
  		path: data.path + '?' + qsdata,
  		method: data.method
  	};
  	
  	if(data.method == 'POST')
  	{
  		options.path = data.path;
		options.headers = {  
			'Content-Type': 'application/x-www-form-urlencoded',  
			'Content-Length': qsdata.length  
		};
  	}
  	
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
  			log.trace("Response body: " + body);
  			try
  			{
  				var d = JSON.parse(body);
  				// See http://developers.soundcloud.com/docs/api/guide#errors for full list of error codes
	  			if( response.statusCode != 200 )
  				{
  					log.error("SoundCloud API ERROR: " + response.statusCode);
  					callback(d.errors, d);
  				}
	  			else
  				{
  					log.trace("SoundCloud API OK: " + response.statusCode);
  					callback(undefined, d);
  				}
  			} catch(e)
  			{
  				callback(e);
  			}
  		});
	});
	
	req.on('error', function(e) {
	  	log.error("For Request: " + options.method + '; ' + options.hostname + options.path);
  		log.error("Request error: " + e.message);  
  		callback(e);	
  	});
  	
  	if(data.method == 'POST')
  	{
  		log.debug("POST Body: " + qsdata);
		req.write(qsdata);
  	}
  	
  	req.end();
}
  	  	
  	  	


