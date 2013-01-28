define(['jquery'
	, './widget/uninterruptedscroll/drag'
	, './widget/showdetail/main'
	], function($, uninterruptedScroll, ShowDetail) {
    'use strict';

	return {
		'init': function(){
			$('.mover').each(function(e){
				uninterruptedScroll($(this));
			});
			// Light Box
			ShowDetail.init();
		}
	};

});