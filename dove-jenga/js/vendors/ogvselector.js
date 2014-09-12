(function (window, undefined) {
	'use strict';
	var $s = function (context) {
		return $s.fn.selector(context);
	};
	$s.fn = $s.prototype = {
		selector: function (context) {
			var el = document.querySelector(context);
			if (el === null || el === undefined) {
				throw new Error('(' + context + ') not found.');
			}
			$s.fn.methods.call(el);
			return el;
		},
		methods: function () {
			this.none = function (delay) {
				var $this = this;
				if (delay === undefined) {
					this.style.display = 'none';
					return;
				}
				setTimeout(function () {
					$this.style.display = 'none';
				}, delay * 1000);
			};
			this.block = function (delay) {
				var $this = this;
				if (delay === undefined) {
					this.style.display = 'block';
					return;
				}
				setTimeout(function () {
					$this.style.display = 'block';
				}, delay * 1000);
			};
			this.addClass = function (name, delay) {
				var $this = this;
				if (delay === undefined) {
					this.classList.add(name);
					return;
				}
				setTimeout(function () {
					$this.classList.add(name);
				}, delay * 1000);
			};
			this.removeClass = function (name, delay) {
				var $this = this;
				if (delay === undefined) {
					this.classList.remove(name);
					return;
				}
				setTimeout(function () {
					$this.classList.remove(name);
				}, delay * 1000);
			};
			this.hasClass = function (name) {
				var $this = this;
				return $this.classList.contains(name);
			};
			this.toggleClass = function (name, delay) {
				if (this.hasClass(name)) {
					this.removeClass(name, delay);
				} else {
					this.addClass(name, delay);
				}
			};
			this.opacity = function (state, seconds) {
				this.style.opacity = state;
				this.transition('opacity', seconds);
			};
			this.translate3d = function (x, y, z, s) {
				x = x || 0;
				y = y || 0;
				z = z || 0;
				s = s || 0.5;
				this.style.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)';
				this.transition('all', s);
			};
			this.transition = function (propertieString, seconds) {
				this.clearTransition(this.style.cssText, seconds);
				this.style.webkitTransition = propertieString + ' ' + seconds + 's';
			};
			this.clearTransition = function (old, delay) {
				var $this = this;
				if (delay === undefined) {
					this.style.cssText = old;
					return;
				}
				setTimeout(function () {
					$this.style.cssText = old;
				}, delay * 1000);
			};
		}
	};
	window.$s = $s;
}(window, undefined));
