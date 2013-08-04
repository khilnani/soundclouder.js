var sc = require("../lib/soundclouder"),
	request = require("request"),
        log = require("dysf.utils").logger
        config = require("./config")
        vows = require("vows");

log.setLogLevel(5);

var sccode = config.sc_code;
var oauth_token = config.oauth_token;


vows.describe('soundclouder.js').addBatch({
  "When using soundclouder ": {
    "initialization": {
      "should not error": function () {
		sc.init(config.sc_client_id, config.sc_client_secret, config.sc_redirect_uri);
		var c = sc.getConfig();
		log.info(c);
      }
    }
  }
}).addBatch({
  "When using soundclouder ": {
    "authorization": {
      "should not error": {
      	topic: function () {
			sc.auth(sccode, this.callback);
		},
		'returns': function (e, token) {
			log.event("sc.auth()");
			if(e != null)
			{
				log.error('sc.auth(): ERROR');
				log.error(e);
			}
			else
			{
				log.event('sc.auth(): access_token=' + token );
			}
		}
      }
    }
  }
}).addBatch({
  "When using soundclouder ": {
    "a get /me API call": {
      "should not error": { 
			topic: function () {
				sc.get('/me', oauth_token, this.callback);
			},
			'returns': function(error, data) {
				log.event("sc.get() /me");
				if(error) log.error(error.message);
				else log.info(data);
			}
		}
    }
  }
}).addBatch({
  "When using soundclouder ": {
    "a get /track API call": {
      "should not error": { 
			topic: function () {
				sc.get('/tracks/103094732', oauth_token, this.callback);
			},
			'returns': function(error, data) {
				log.event("sc.get() /tracks/103094732");
				if(error) log.error(error.message);
				else log.info(data);
			}
		}
    }
  }
}).export(module);
