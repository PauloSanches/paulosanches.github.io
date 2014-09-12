(function() {
	'use strict';

	var $u = (function() {
		/**
		Bloqueia a peça na revista.

		@method lock
		@return {String}
		**/

		function lock() {
			document.addEventListener('touchstart', preventDefault, false);
			document.addEventListener('touchmove', preventDefault, false);
			document.addEventListener('touchend', preventDefault, false);
		}
		/**
		Desbloqueia a peça na revista.

		@method unlock
		@return {String}
		**/

		function unlock() {
			document.removeEventListener('touchstart', preventDefault, false);
			document.removeEventListener('touchmove', preventDefault, false);
			document.removeEventListener('touchend', preventDefault, false);
		}
		/**
		Previne a ação padrão de um evento.

		@method preventDefault
		@param {String} event Evento cuja ação padrão será bloqueada.
		@return {String}
		**/

		function preventDefault() {
			event.preventDefault();
		}
		/**
		Exibe um "debug log" no HTML.

		@method log
		@param {String} text Conteúdo a ser exibido pelo debug.
		@return false
		**/

		function log(text) {
			// if deployed return
			if (!document.querySelector('#log')) {
				return;
			}

			// write on HTML messages to debug
			document.querySelector('#log').innerHTML = text;

			return false;
		}

		function loop(fps, callback) {
			var now, delta,
				then = Date.now(),
				interval = 1000 / fps,
				fps = fps,
				oldtime = 0,
				frames,
				cb = callback;

			return (function l(time){
				requestAnimationFrame(l);

		        interval = 1000 / (fps || 60);
		        now = new Date().getTime();
		        delta = now - then;

		        if (delta > interval) {
		            then = now - (delta % interval);

		            frames = 1000 / (time - oldtime)
		            oldtime = time;

		            cb();
		        }
		    }(0));
		}

		return {
			lock: lock,
			unlock: unlock,
			log: log,
			randomRange: randomRange,
			loop: loop
		};
		/**
		Captura um número aleatório entre dois valores

		@method randomRange
		@param {Number} min Valor minimo a ser selecionado
		@param {Number} max Valor máximo a ser selecionado
		@return {Number}
		**/

		function randomRange(min, max) {
			return ((Math.random() * (max - min)) + min);
		}
	}());

	window.$u = $u;
}());
