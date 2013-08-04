soundclouder.js [![Build Status](https://api.travis-ci.org/khilnani/soundclouder.js.png?branch=master)](https://travis-ci.org/khilnani/soundclouder.js)
===============

SoundCloud API for Node.js. What else is there to say?


SoundCloud APIs Implemented
===============
- Connection/Authorization Url
- OAuth Authorization (/oauth2/token)
- General GET and POSTS. PUT and DELETE in draft.

Usage
==============

<pre>
var sc = require("soundclouder");
// client id, secret and redirect url are the values obtained from http://soundcloud/you/apps
sc.init(sc_client_id, sc_client_secret, sc_redirect_uri);
// sc_code is the code obtained after authenitcating the application using the Browser based SoundCloud App Login
sc.auth(sc_code, function (e, oauth_token) 
{
	if(e) 
	{
		console.error(e.message);
	} 
	else 
	{
		console.log('oauth_token=' + oauth_token );
	}
});
</pre>
<pre>
sc.get('/tracks/' + track_id, oauth_token, function (data) {

console.log( data.title );

});
</pre>

<pre>
sc.put('/tracks/' + track_id, oauth_token, { description: "new description" }, function (data) {

console.log( data.title );

});
</pre>

Installation
============

Global
--------- 
- Run: <code>sudo npm install soundclouder -g</code>
- Usually installed at - /usr/local/lib/node_modules/soundclouder

Project
---------
- Add <code>"soundclouder": "x.x.x"</code> to the dependencies section of your project's package.json 
  - Example <code>"dependencies": { "soundclouder": "x.x.x" }</code>
- Run <code>npm install</code> in the director with your package.json
- Usually installed at - PROJECT_DIR/node_modules/soundclouder
