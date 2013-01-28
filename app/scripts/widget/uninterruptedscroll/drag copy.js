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
			this.$ul = this.$mover.find('ul');
			this.$ulClone = this.$ul.clone();
			this.moverWidth = this.$mover.width();
			this.ulWidth = this.$ul.width();
			this.ulLeft = this.$ul.position().left;
			
			this.ev();
		},

		ev: function () {

			var me = this,
				mouseActive = false,
				startMouseLeft = 0;

			me.$section
			.on('mousedown', 'ul', function(e){
				e.preventDefault();
				mouseActive = true;
				startMouseLeft = e.offsetX;
			})
			.on('mouseup', 'ul', function (e) {
				e.preventDefault();
				mouseActive = false;

				// Reset
				me.moverLeft = me.$mover.position().left;

			})
			.on('mousemove', 'ul', function (e) {
				e.preventDefault();
				if(mouseActive) {
					var offsetX = e.offsetX-startMouseLeft;
					// Postion
					var newLeft = me.moverLeft + offsetX;

					if (offsetX<=0) {
						// Remove pass slide
						if (Math.abs(newLeft) >= me.partWidth) {
							me.$mover.find('ul:first-child').remove();
							newLeft += me.partWidth;
							me.moverWidth -= me.partWidth;
							me.$mover.width(me.moverWidth);
						}

						//
						if ((me.moverWidth + newLeft) <= me.sectionWidth) {
							me.moverWidth += me.partWidth;
							me.$mover.width(me.moverWidth);
							me.$mover.append(me.$partClone);
						}
					}
					else {
						if((me.moverWidth+newLeft) - me.sectionWidth >= me.partWidth){
							console.log("moverWidth:"+me.moverWidth);
							console.log("newLeft:"+newLeft);
							console.log("sectionWidth:"+me.sectionWidth);
							console.log("partWidth:"+me.partWidth);
							me.$mover.find('ul:last-child').remove();
							me.moverWidth -= me.partWidth;
							me.$mover.width(me.moverWidth);
						}

						if(newLeft>0){
							me.moverWidth += me.partWidth;
							me.$mover.width(me.moverWidth);
							me.$mover.prepend(me.$partClone);
							newLeft -= me.partWidth;
						}
					}
					me.$mover.css('left', newLeft);

					// Reset
					me.moverLeft = newLeft;

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