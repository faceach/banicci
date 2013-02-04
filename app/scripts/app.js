define(['jquery'
	, './widget/uninterruptedscroll/main'
	, './widget/uninterruptedscroll/drag'
	, './widget/showdetail/main'
	], function($, uninterruptedScroll, uninterruptedScrollDrag, ShowDetail) {
    'use strict';

	var getUA = function(){
	    var u = navigator.userAgent;
		var ua = {
		    trident: u.indexOf('Trident') > -1,
		    presto: u.indexOf('Presto') > -1,
		    webKit: u.indexOf('AppleWebKit') > -1,
		    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
		    mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/),
		    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
		    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
		    iPad: u.indexOf('iPad') > -1,
		    webApp: u.indexOf('Safari') == -1
		};
		return ua.ios;
    };

	return {
		'init': function(){
			$('.mover').each(function(e){
				if (getUA()) {
					uninterruptedScroll($(this));
				}
				else {
					uninterruptedScrollDrag($(this));
				}
			});
			// Light Box
			ShowDetail.init();
		}
	};

});