(function () {
	'use strict';

	var $u = (function () {
		/**
		Bloqueia a peça na revista.

		@method lock
		@return {String}
		**/
		function lock(){
			document.addEventListener('touchstart', preventDefault, false);
			document.addEventListener('touchmove', preventDefault, false);
			document.addEventListener('touchend', preventDefault, false);
		}
		/**
		Desbloqueia a peça na revista.

		@method unlock
		@return {String}
		**/
		function unlock(){
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
		function preventDefault(){
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
		return {
			lock: lock,
			unlock: unlock,
			log: log
		};
	}());

	window.$u = $u;
}());
