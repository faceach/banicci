define(['jquery'
	, './widget/uninterruptedscroll/main'
	, './widget/showdetail/main'
	], function($, UninterruptedScroll, ShowDetail) {
    'use strict';

	return {
		'init': function(){
			$('.mover').each(function(e){
				(new UninterruptedScroll).init($(this));
			});
			// Light Box
			ShowDetail.init();
		}
	};

});