define(['jquery', 'jquery-ui'],function($){
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

			var startX = 0;
			var ulLeft = 0;
			var marginLeft = 0;
			
			// Reset overflow value
			$me.css("overflow", "hidden");

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