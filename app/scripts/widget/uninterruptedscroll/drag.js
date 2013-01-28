define(['jquery'],function($){
	'use strict';

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

			var mouseActive = false;
			var startMouseLeft = 0;
			var ulLeft = 0
			
			// Reset overflow value
			$me.css("overflow", "hidden");
			// Move 1px left to enable right-side-scroll
			$ul.css("left", -1);

			$me
			.on('mousedown', 'ul', function(e){
				e.preventDefault();
				mouseActive = true;
				startMouseLeft = e.offsetX;
			})
			.on('mouseup', 'ul', function (e) {
				e.preventDefault();
				mouseActive = false;
			})
			.on('mousemove', 'ul', function (e) {
				e.preventDefault();
				if(mouseActive) {
					var offsetX = e.offsetX-startMouseLeft;
					// Postion
					var scrollLeft = ulLeft + offsetX;
					var $firstLi = $ul.find("li:first");
					var $lastLi = $ul.find("li:last");
					var firstLiWidth = $firstLi.width();
					var lastLiWidth = $lastLi.width();
					var dis = scrollLeft - firstLiWidth;
					// Keep scroll uninterrupted
					if(dis > 0) {
						$ul.append($firstLi);
						ulLeft = dis;
					}
					else if(scrollLeft <= 0) {
						$ul.prepend($lastLi);
						ulLeft = scrollLeft + lastLiWidth;
					}
					else {
						ulLeft = scrollLeft;
					}
					$ul.css("left", ulLeft);
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