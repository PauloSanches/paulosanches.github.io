(function(window, undefined) {
	'use strict';
	/**
	Main application class

	@class OgvAd
	@constructor
	**/
	var OgvAd = (function () {
		// private attributes and methods

		// public attributes and methods (Class methods AKA API)
		return {
			/**
			Inicializar a aplicação

			@method init
			@return false
			**/
			init: function () {

				OgvAd.CAT.init();

			},
			/**
			Encerrar a aplicação

			@method close
			@return false
			**/
			close: function () {

			}
		};

	}(window.OgvAd));

	window.OgvAd = OgvAd || {};

	// Initialize application
	window.addEventListener('load', OgvAd.init, false);

}(window, undefined));
