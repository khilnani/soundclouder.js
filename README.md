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

In your *node.js* application -

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
```

Once you have created an application at http://soundcloud.com/you/apps, you need to use the SoundCloud Javascript library to authenticate a user and get a 'code'. 

The code below, will prompt the user to authorize your application. The user's browser will be redirected to the REDIRECT_URI you specified in the SoundCloud application setup. This REDIRECT_URI will be sent a Request paramater 'code'

*Sample html code*
```html
<script src="http://connect.soundcloud.com/sdk.js"></script>
<script type="text/javascript">
    SC.initialize({
      client_id: "CLIENT_ID",
      redirect_uri: "REDIRECT_URI",
      display: 'popup'
    });

    SC.connect(function () {
      console.log("Connected to SoundCloud");
      alert("Connected to SoundCloud");
    });
</script>
```

SoundCloud will redirect the user to `REDIRECT_URI?code=CODE`. Eg. `http://SITE/sc_redirect?code=CODE`

If you are using Express.js, you can setup a route for the REDIRECT_URI - eg.`http://SITE/sc_redirect`. 

*Sample Express.js code*
```javascript

var express = require('express'),
	sc = require("soundclouder"),
	app = express();
	
// Define the route handler for /sc_redirect
function scRedirectHandler (request, response) {
  // get the 'code' paramater from the request
  var code = request.query.code;
  // authorize and get an access token
  sc.auth(code, function (error, accesstoken) {
    if (error) {
      console.error(e.message);
    } else {
      // Store the access_token somewhere, perhaps the user's session
      console.log('access_token=' + access_token );
      // call subsequent calls to SoundCloud
      // send the method the saved access_token for the user
      sc.get('/tracks/11222211', access_token, function (error, data) {
        console.log( data.title );
      });
    }
  });
  // send dummy html back to the browser
  response.send("<html><body>code: " + code + "</body></html");
}

//register the handler
app.get('/sc_redirect', scRedirectHandler);


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
