
define('scripts/widget/uninterruptedscroll/main',['jquery'], function($){
    
	
	var Widget = function($mover){
		if(!$mover || $mover.length <=0){
			return;
		}
		this.$mover = $mover;
	};
	Widget.prototype ={
		init: function () {
			var me = this;
			var $me = me.$mover;
			var $ul = $me.find("> ul");
			// Only scroll over-width target
			if($ul.width() < $me.width()){
				return;
			}
			// Reset overflow value
			$me.css("overflowX", "auto");
			// Move 1px left to enable right-side-scroll
			$me.scrollLeft(1);
			// Add first child to right-side, so will keep the left-scroll condition
			/*$ul.append($ul.find("li:first").clone());*/
			
			// Scroll event
			$me.scroll(function(e) {
				var scrollLeft = $me.scrollLeft();
				var $firstLi = $ul.find("li:first");
				var $lastLi = $ul.find("li:last");
				var firstLiWidth = $firstLi.width();
				var lastLiWidth = $lastLi.width();
				var dis = scrollLeft - firstLiWidth; 
				if(dis > 0) {
					$ul.append($firstLi);
					$me.scrollLeft(dis);
					return;
				}
				if(scrollLeft <= 0) {
					$ul.prepend($lastLi);
					$me.scrollLeft(scrollLeft + lastLiWidth);
					return;
				}
			});
		}
	};

	return function(args){
		var w = new Widget(args);
		if(!w){
			return;
		}
		w.init();
	};

});
define('scripts/widget/uninterruptedscroll/drag',['jquery', 'jquery-ui'],function($){
	

	var Widget = function($mover){
		if(!$mover || $mover.length <=0){
			return;
		}
		this.$mover = $mover;		
	};
	Widget.prototype ={
		init: function () {
			var me = this;
			var $me = me.$mover;
			var $ul = $me.find("> ul");

			var startX = 0;
			var ulLeft = 0;
			var marginLeft = 0;
			
			$ul.draggable({ axis: "x",
				start: function(e){
					startX = e.pageX;
				},
				drag: function(e) {
			        // Postion
					var offsetX = e.pageX - startX;
					var $firstLi = $ul.find("li:first");
					var $lastLi = $ul.find("li:last");
					var firstLiWidth = $firstLi.width();
					var lastLiWidth = $lastLi.width();
					// Keep scroll uninterrupted
					ulLeft = ulLeft + offsetX;
					// Left
					if(ulLeft < 0 && -1 * ulLeft >= (marginLeft + firstLiWidth)){
						marginLeft += firstLiWidth;
						$ul.append($firstLi).css("marginLeft", marginLeft);
					}
					// Right
					if(ulLeft > -1 * marginLeft){
						marginLeft += -1 * lastLiWidth;
						$ul.prepend($lastLi).css("marginLeft", marginLeft);
					}
					startX = e.pageX;
		      	},
		      	stop: function(){
		      		$ul.css("marginLeft", 0);
		      		$ul.css("left", "+=" + marginLeft);
		      		ulLeft = parseInt($ul.css("left"));
		      		marginLeft = 0;
		      	}
  			});
		}

	};

	return function(args){
		var w = new Widget(args);
		if(!w){
			return;
		}
		w.init();
	};

});
define('scripts/widget/showdetail/main',['jquery', 'fancybox'], function($){
    

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
define('scripts/app',['jquery'
	, './widget/uninterruptedscroll/main'
	, './widget/uninterruptedscroll/drag'
	, './widget/showdetail/main'
	], function($, uninterruptedScroll, uninterruptedScrollDrag, ShowDetail) {
    

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
		return ua;
    };

	return {
		'init': function(){
			$('.mover').each(function(e){
				if (getUA().ios) {
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