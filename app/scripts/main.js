var appRequire = require.config({
	paths: {
	    hm: 'vendor/hm',
	    esprima: 'vendor/esprima',
	    jquery: 'vendor/jquery-1.8.3.min',
	    "jquery-ui": 'vendor/jquery-ui-1.10.0.custom.min',
        "fancybox": "fancybox/source/jquery.fancybox.js?v=2.1.3"
    },
	shim: {
        'fancybox': {
            deps: ['jquery']
        },
        'jquery-ui': {
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