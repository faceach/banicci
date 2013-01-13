define([
'jquery'
	], function($){
    'use strict';
	
	var o = function(){};
	o.prototype ={
		init: function ($mover) {
			if(!$mover || $mover.length <=0){
				return;
			}
			this.$mover = $mover;

			this.ev();
		},
		ev: function () {
			var me = this;
			var $me = me.$mover;
			var $ul = $me.find("> ul");
			// Only scroll over-width target
			if($ul.width() < $me.width()){
				return;
			}
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
				}
			});
		}
	};

	return o;

});