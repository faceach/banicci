var appRequire = require.config({
	paths: {
	    hm: 'vendor/hm',
	    esprima: 'vendor/esprima',
	    jquery: 'vendor/jquery.min',
        "fancybox": "fancybox/source/jquery.fancybox.js?v=2.1.3"
    },
	shim: {
        'fancybox': {
            deps: ['jquery']
        }
	}
});
 
appRequire(['require', 'app', 'fancybox'], function(parentRequire, app) {
    'use strict';
 
	$(document).ready(function() {
		
        app.init();

    });

});