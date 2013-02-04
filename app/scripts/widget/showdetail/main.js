define(['jquery', 'fancybox'], function($){
    'use strict';

	return {
        'init': function(){
		
            $('.fancybox').fancybox({
                wrapCSS     : 'fancybox-custom',
                padding     : 10,
                openEffect  : 'elastic',
                openSpeed   : 150,
                closeEffect : 'elastic',
                closeSpeed  : 150,
                closeClick  : true,
                helpers     : {
                    overlay : null,
                    title   : {
                        type: 'inside'
                    }
                }   
            });

        }
    };
	
});