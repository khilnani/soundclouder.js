**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [soundclouder.js [![Build Status](https://api.travis-ci.org/khilnani/soundclouder.js.png?branch=master)](https://travis-ci.org/khilnani/soundclouder.js)](#soundclouderjs-!build-statushttpsapitravis-ciorgkhilnanisoundclouderjspngbranch=masterhttpstravis-ciorgkhilnanisoundclouderjs)
- [SoundCloud APIs Implemented](#soundcloud-apis-implemented)
- [Usage](#usage)
- [Links](#links)
- [Installation](#installation)
	- [Global](#global)
	- [Project](#project)

soundclouder.js [![Build Status](https://api.travis-ci.org/khilnani/soundclouder.js.png?branch=master)](https://travis-ci.org/khilnani/soundclouder.js)
===============

SoundCloud API for Node.js. What else is there to say?


SoundCloud APIs Implemented
===============
- Connection/Authorization Url
- OAuth Authorization (/oauth2/token)
- General GET, PUT, POST and DELETE.

Usage
==============

<pre>
var sc = require("soundclouder");

// client id, secret and redirect url are the values obtained from http://soundcloud/you/apps
sc.init(sc_client_id, sc_client_secret, sc_redirect_uri);

// code sent by the browser based SoundCloud Login that redirects to the redirect_uri
sc.auth( code, function (error, access_token) 
{
	if(error) 
	{
		console.error(e.message);
	} 
	else 
	{
		console.log('access_token=' + access_token );
	}
});
</pre>
<pre>
sc.get('/tracks/' + track_id, access_token, function (data) {

	console.log( data.title );

});
</pre>


Links
============
- Application Setup - http://developers.soundcloud.com/docs/api/guide#authentication
- Error Codes - http://developers.soundcloud.com/docs/api/guide#errors


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
