soundclouder.js
===============

SoundCloud API for Node.js. What else is there to say?


SoundCloud APIs Implemented
===============
- /oauth2/token

Usage
==============

<pre>
var sc = require("soundclouder");
sc.init(sc_client_id, sc_client_secret, sc_redirect_uri);
sc.auth(sc_code, function (e) {
	if(e) 
  	 {
  		log.error(e.message);
	} else {
		log.info('access_token=' + sc.accesstoken());
	}
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
