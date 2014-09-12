(function () {
	'use strict';
	var $u = (function () {
		var logLimit = 3,
		rfAs = [];

		function lock() {
			document.addEventListener('touchstart', preventDefault, false);
			document.addEventListener('touchmove', preventDefault, false);
			document.addEventListener('touchend', preventDefault, false);
		}

		function unlock() {
			document.removeEventListener('touchstart', preventDefault, false);
			document.removeEventListener('touchmove', preventDefault, false);
			document.removeEventListener('touchend', preventDefault, false);
		}

		function preventDefault() {
			event.preventDefault();
		}

		function timer(callback, seconds) {
			return setTimeout(callback, seconds);
		}

		function clearTimer(id) {
			clearTimeout(id);
		}

		function isPortrait() {
			return window.matchMedia('(orientation: portrait)').matches;
		}

		function log(text) {
			var dom = document.querySelector('#log');
			if (!dom) {
				throw new Error('Log doesnt exist.');
			}
			removeLog();
			var l = document.createElement('p');
			l.innerHTML = text;
			dom.appendChild(l);
		}

		function removeLog() {
			if (document.querySelector('#log').children.length >= logLimit) {
				document.querySelector('#log').removeChild(document.querySelector('#log').children[0]);
			}
		}

		function clicktag(url, x, y, w, h) {
			var safe = 100;
			x = x || safe;
			y = y || safe;
			w = w || document.querySelector('#ogvStage').clientWidth - (safe * 2);
			h = h || document.querySelector('#ogvStage').clientHeight - (safe * 2);
			var e = create('div', w, h, x, y);
			e.addEventListener('mousedown', function () {
				window.open(url);
			}, false);
		}

		function create(element, w, h, x, y) {
			var el = document.createElement(element);
			el.style.position = 'absolute';
			el.style.width = w + 'px';
			el.style.height = h + 'px';
			el.style.top = y + 'px';
			el.style.left = x + 'px';
			document.querySelector('#ogvStage').appendChild(el);
			return el;
		}

		function loop(id, fps, callback) {
			var now;
			var then = Date.now();
			var interval = 1000 / fps;
			var delta;
			var that = this;

			function draw() {
				that[id] = requestAnimationFrame(draw);
				now = Date.now();
				delta = now - then;
				if (delta > interval) {
					then = now - (delta % interval);
					callback();
				}
			}
			draw();
		}

		function cancelLoop (id) {
			cancelAnimationFrame(this[id]);
		}

		return {
			lock: lock,
			unlock: unlock,
			log: log,
			timer: timer,
			clearTimer: clearTimer,
			isPortrait: isPortrait,
			clicktag: clicktag,
			loop: loop,
			cancelLoop: cancelLoop
		};
	}());
	window.$u = $u;
}());
