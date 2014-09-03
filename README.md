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

> SoundCloud API for Node.js. 

NPM Module Info - https://www.npmjs.org/package/soundclouder


SoundCloud APIs Implemented
===============
- Connection/Authorization Url
- OAuth Authorization (/oauth2/token)
- General GET, PUT, POST and DELETE.

Usage
==============

```javascript
// Include the soundclouder library
var sc = require("soundclouder");

// Update the logging level
// See: https://github.com/khilnani/dysf.utils
// Also see: test/test.js
var log = require("dysf.utils").logger
// 0: system, 1: error, 2: warn, 3: event, 4: info, 
// 5: debug, 6: trace. Default is 4 (info)
// Set to debug
log.setLogLevel(5);

// client id, secret and redirect url are the values obtained from 
// <a href="http://soundcloud.com/you/apps">http://soundcloud.com/you/apps</a>
sc.init(sc_client_id, sc_client_secret, sc_redirect_uri);

// code sent by the browser based SoundCloud Login
// that redirects to the redirect_uri
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
```

```javascript
sc.get('/tracks/' + track_id, access_token, function (error, data) {

	console.log( data.title );

});
```


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
