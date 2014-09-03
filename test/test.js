var sc = require("../lib/soundclouder"),
	request = require("request"),
        log = require("dysf.utils").logger
        config = require("./config")
        vows = require("vows");

// set log level to debug (trace is 5)
log.setLogLevel(5); 

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
}).addBatch({
  "When using soundclouder ": {
    "requests should use client_id": {
      "when no oath_token is provided": {
		topic: function() {
		  sc.get('/tracks/106176078', '', this.callback);
		},
		'returns': function(error, data) {
		  log.event('sc.get() /tracks/103094732');
		  if (data !== undefined) log.info('data returned');
		  else log.error(error);
		}
	  }
    }
  }
}).addBatch({
	"When using soundclouder ": {
		"requests with query parameters": {
			"should not error": {
				topic: function () {
					sc.get('/tracks?q=rac', '', this.callback);
				},
				'returns': function(error, data) {
					log.event('sc.get() /tracks?q=?rac');
					if (data !== undefined) log.info('data returned');
					else log.error(error);
				}
			}
		}
	}
}).export(module);
