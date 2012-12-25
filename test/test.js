
var sc = require("../lib/soundclouder"),
        log = require("dysf.utils").logger;


log.setLogLevel(5);

var sccode = '7b5645936c88c1606d973ac1b2e0c0ed';

log.event("sc.init()");
sc.init('8298c1d316d40cd38954c7f44375c675', '0510b5ecaa7f0cc8587797aa9f350809', 'http://dev.dysf.co:8080/sc');

log.event("sc.auth()");
sc.auth(sccode, function (e) {
	if(e != null)
	{
		log.error('sc.auth(): ERROR');
		log.error(e);
	}
	else
	{
		log.event('sc.auth(): access_token=' + sc.accesstoken());
	}
});
