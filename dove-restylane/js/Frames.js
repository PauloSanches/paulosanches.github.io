(function() {
	'use strict';
	var Frames = function(element, options) {
		return new Frames.Instance(element, options || {});
	};
	Frames.defaults = {
		fps: 60,
		indice: 0,
		drag: false,
		autoplay: false,
		timer: 0,
		onComplete: null,
		onUpdate: null,
		skip: 0
	};
	Frames.utils = {
		extend: function extend(dest, src, merge) {
			/*jshint -W089 */
			for (var key in src) {
				if (dest[key] !== undefined && merge) {
					continue;
				}
				dest[key] = src[key];
			}
			return dest;
		}
	};
	Frames.Instance = function(element, options) {
		this.element = element;
		this.id = element.id;
		this.options = Frames.utils.extend(Frames.utils.extend({}, Frames.defaults), options || {});
		this.setup();
	};
	Frames.Instance.prototype = {
		setup: function() {
			this.element.style.WebkitTransform = 'translateZ(0)';
			this.element.style.position = 'absolute';
			this.engine = new TagEngine(this.element, this.options);
		},
		init: function() {
			this.engine.init();
		}
	};
	var TagEngine = function(element, options) {
		return new TagEngine.Instance(element, options || {});
	};
	TagEngine.Instance = function(element, options) {
		this.element = element;
		this.id = element.id;
		this.options = options;
		this.document = window.document;
		this.dragging = false;
		this.finish = false;
		this.setup();
	};
	TagEngine.Instance.prototype = {
		xInicial: null,
		xMove: null,
		indiceACorrer: 0,
		inactivity: null,
		setup: function() {
			this.list = this.element.querySelectorAll('img');
			this.length = this.list.length;
			// Handle DOM images
			var that = this,
				i = 0,
				l = this.length;
			for (; i < l; i++) {
				var scene = this.list[i];
				scene.style.position = 'absolute';
				if (i === this.options.indice) {
					continue;
				}
				scene.style.display = 'none';
			}
			if (this.options.drag) {
				this.gesture = new window.Gesture(this.document, function(event) {
					that.gestureHandler(event);
				});
			}
			if (!this.options.drag) this.start();
			this.element.classList.remove('none');
		},
		updateOptions: function(options) {
			this.options = options;
		},
		gestureHandler: function(event) {
			switch (event.type) {
				case 'touchstart':
					this.disableInactivityTimer();
					this.xInicial = event.changedTouches[0].pageX;
					this.xMove = event.changedTouches[0].pageX;
					break;
				case 'touchmove':
					if (event.changedTouches[0].pageX < this.xMove) {
						this.runAnimation(Math.abs(event.changedTouches[0].pageX - this.xInicial));
						if (this.options.onUpdate) this.options.onUpdate();
					} else if (event.changedTouches[0].pageX > this.xMove) {
						return;
					}
					this.xMove = event.changedTouches[0].pageX;
					break;
				case 'touchend':
					this.indiceACorrer = this.options.indice;
					if (this.options.indice >= this.list.length - 8) {
						this.completaRasgo();
					} else {
						this.enableInactivityTimer();
					}
					break;
			}
		},
		runAnimation: function(distancia) {
			var valor = this.indiceACorrer + Math.floor(distancia / 14);
			this.list[this.options.indice].style.display = 'none';
			this.options.indice = valor < this.length - 1 ? valor : this.length - 1;
			this.list[this.options.indice].style.display = '';
			if (this.options.indice >= this.list.length - 1) {
				this.complete();
			}
		},
		handler: function() {
			if ((this.options.autoplay && !this.options.drag)) {
				this.fowardCheckLimit();
			}
		},
		foward: function() {
			this.list[this.options.indice].style.display = 'none';
			var indice = this.options.skip > 0 ? this.options.indice += this.options.skip : ++this.options.indice;
			if (indice > this.length - 1) {
				indice = this.length - 1;
			}
			this.list[indice].style.display = '';
		},
		fowardCheckLimit: function() {
			if (this.options.indice >= this.list.length - 1) {
				this.complete();
			} else {
				this.foward();
				if (this.options.onUpdate) {
					this.options.onUpdate();
				}
			}
		},
		complete: function() {
			if (this.options.drag) {
				this.gesture.stop();
			} else {
				this.stop();
			}
			this.finish = true;
			if (this.options.onComplete) {
				this.options.onComplete();
			}
		},
		start: function() {
			var that = this,
				now = 0,
				then = Date.now(),
				interval = 1000 / this.options.fps,
				delta = 0;

			function loop() {
				that[that.id] = requestAnimationFrame(loop);
				now = Date.now();
				delta = now - then;
				if (delta > interval) {
					then = now - (delta % interval);
					that.handler();
				}
			}
			loop();
		},
		stop: function() {
			cancelAnimationFrame(this[this.id]);
		},
		enableInactivityTimer: function() {
			var that = this;
			this.inactivity = window.setTimeout(function() {
				that.completaRasgo();
			}, 3000);
		},
		disableInactivityTimer: function() {
			window.clearTimeout(this.inactivity);
		},
		completaRasgo: function() {
			this.gesture.stop();
			this.options.autoplay = true;
			this.options.drag = false;
			this.options.skip = 0;
			this.start();
		}
	};
	window.Frames = Frames;
}());