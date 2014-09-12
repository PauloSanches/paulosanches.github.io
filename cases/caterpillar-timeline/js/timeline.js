(function() {
	'use strict';

	var Timeline = function(area, container, speed) {
		this.init(area, container, speed);
	};

	Timeline.fn = Timeline.prototype = {
		constructor: Timeline,
		container: undefined,
		area: undefined,
		slides: 0,
		slideWidth: 0,
		slideActual: 0,
		minPosX: 0,
		maxPosX: 0,
		posX: 0,
		lastPosX: 0,
		tmpLastPosX: 0,
		dragReady: 0,
		direction: '',
		speed: 0,
		hammer: undefined,
		lock: false,
		init: function(area, container, speed) {

			Timeline.fn.container = container;
			Timeline.fn.area = area;
			Timeline.fn.speed = speed;

			Timeline.fn.timelineSettings();
			Timeline.fn.touchSettings();

		},
		timelineSettings: function(){
			Timeline.fn.slides = Timeline.fn.container.children.length;
			Timeline.fn.slideWidth = Timeline.fn.container.children[0].width;
			Timeline.fn.slideActual = 0;
			Timeline.fn.maxPosX = 0;
			Timeline.fn.minPosX = -((Timeline.fn.slides * Timeline.fn.slideWidth) - Timeline.fn.slideWidth);
		},
		touchSettings: function(){
			Timeline.fn.hammer = new window.Hammer(Timeline.fn.area, {
				prevent_default: true,
				drag_min_distance: 0,
				hold: false
			});

			Timeline.fn.hammer.on('drag', Timeline.fn.dragHandler);
			Timeline.fn.hammer.on('dragend', Timeline.fn.dragendHandler);
		},
		dragHandler: function(ev) {

			Timeline.fn.direction = ev.gesture.direction;


			// console.log(ev.gesture.deltaX, Timeline.fn.tmpLastPosX, ev.gesture.deltaX + Timeline.fn.tmpLastPosX);
			Timeline.fn.posX = Timeline.fn.checkDragBounds((ev.gesture.deltaX * Timeline.fn.speed)  + Timeline.fn.lastPosX);
			Timeline.fn.tmpLastPosX = Timeline.fn.posX;
			// Timeline.fn.move(Timeline.fn.posX);
		},
		checkDragBounds: function(posx) {
			var px;

			if (posx >= Timeline.fn.maxPosX) {
				px = Timeline.fn.maxPosX;
			} else if (posx <= Timeline.fn.minPosX) {
				px = Timeline.fn.minPosX;
			} else {
				px = posx;
			}

			return px;
		},
		setLock: function(value) {
			Timeline.fn.lock = value;
		},
		dragendHandler: function(ev) {

			if(Timeline.fn.lock){
				return;
			}

			Timeline.fn.lastPosX = Timeline.fn.checkDragEndBounds(Timeline.fn.posX);

			Timeline.fn.getSlide();
		},
		checkDragEndBounds: function(posx) {
			var px;

			if (posx >= Timeline.fn.maxPosX) {
				px = Timeline.fn.maxPosX;
			} else if (posx <= Timeline.fn.minPosX) {
				px = Timeline.fn.minPosX;
			} else {
				px = posx;
			}

			return px;
		},
		getSlide: function() {
			Timeline.fn.checkSlide(Timeline.fn.moveToSlide);
		},
		checkSlide: function(callback) {

			var indice = Timeline.fn.slideActual,
				posx = Timeline.fn.lastPosX,
				next = Timeline.fn.nextSlide,
				previous = Timeline.fn.previousSlide;

			switch (Timeline.fn.direction) {
				case 'left':
					if (posx > next(indice)) {
						callback();
					} else {
						Timeline.fn.slideActual++;
						Timeline.fn.checkSlide(callback);
					}
					break;
				case 'right':
					if (posx < previous(indice)) {
						callback();
					} else {
						Timeline.fn.slideActual--;
						Timeline.fn.checkSlide(callback);
					}
					break;
			}
		},
		nextSlide: function(indice) {
			return -(indice * Timeline.fn.slideWidth);
		},
		previousSlide: function(indice) {
			return -(--indice * Timeline.fn.slideWidth);
		},
		moveToSlide: function() {
			var posx = Timeline.fn.nextSlide(Timeline.fn.slideActual);

			if (posx < Timeline.fn.minPosX) {
				posx = Timeline.fn.minPosX;
			}

			if (posx > Timeline.fn.maxPosX) {
				posx = Timeline.fn.maxPosX;
			}

			Timeline.fn.move(posx);
		},
		move: function(posx) {
			var transform = "translate3d(" + posx + "px," + 0 + "px, 0)";
			Timeline.fn.container.style.transform = transform;
			Timeline.fn.container.style.webkitTransform = transform;
			Timeline.fn.container.style.transition = 'all 0.4s ease-in-out';
			Timeline.fn.container.style.webkitTransition = 'all 0.4s ease-in-out';
		}
	};

	window.OgvAd.Timeline = Timeline;
}(window.OgvAd = window.OgvAd || {}));
