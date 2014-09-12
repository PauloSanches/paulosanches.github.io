(function(window, undefined) {
	'use strict';

	var OgvAd = (function () {

		// Timer da assinatura:
		var timerAssinatura;

		/**
		 * Inicializa a peça.
		 */
		var init = function () {

			// Adiciona eventos de toque ao "Arraste aqui":
			$s('.' + getOrientacao() + ' .arraste-aqui').on('touchstart', OgvAd.touch.touchStart);
			$s('.' + getOrientacao() + ' .arraste-aqui').on('touchmove', OgvAd.touch.touchMove);
			$s('.' + getOrientacao() + ' .arraste-aqui').on('touchend', OgvAd.touch.touchEnd);

			// Inicia o timer da assinatura:
			iniciaTimer();

		};

		/**
		 * Finaliza a peça.
		 */
		var close = function () {

		};

		/**
		 * Checa a orientação do iPad:
		 * @return {String}
		 */
		var getOrientacao = function () {

			var mql = window.matchMedia("(orientation: portrait)"),
				orientacao;

			if (mql.matches){
				orientacao = 'portrait';
			} else {
				orientacao = 'landscape';
			}

			return orientacao;

		};

		/**
		 * Método que inicializa o timer da assinatura quando o usuário para de interagir com a peça.
		 */
		var iniciaTimer = function () {

			// Indica se o usuário visualizou a timeline até o fim:
			var viuTudo = OgvAd.timeline.getViuTudo(),
				segundos;

			// Muda o tempo do timer caso o usuário tenha chegado no último ano da timeline:
			if (viuTudo === true){
				segundos = 3;
			} else {
				segundos = 10;
			}

			timerAssinatura = $u.timer(abreAssinatura, segundos);

		};

		/**
		 * Método que cancela o timer enquanto o usuário está interagindo com a peça.
		 */
		var cancelaTimer = function () {
			window.clearTimeout(timerAssinatura);
		};

		/**
		 * Método responsável por esconder a timeline e exibir a assinatura.
		 */
		var abreAssinatura = function () {

			// Delay das animações:
			var delay = 0;

			// Esconde elementos que não aparecem na assinatura:
			$s('.' + getOrientacao() + ' .pre-assinatura').addClass('opacity0');
			delay += 1;
			$s('.' + getOrientacao() + ' .pre-assinatura').addClass('none', delay);
			$s('.' + getOrientacao() + ' .assinatura').removeClass('none');

			if (getOrientacao() === 'landscape') {
				delay += 0.1;
				$s('.' + getOrientacao() + ' .anos-separando-assinatura').addClass('opacity1', delay);
				delay += 0.8;
				$s('.' + getOrientacao() + ' .meninos-inventam').addClass('opacity1', delay);
				delay += 0.5;
				$s('.' + getOrientacao() + ' .assinatura-latinhas').addClass('opacity1', delay);
				delay += 1;
				$s('.' + getOrientacao() + ' .assinatural3').addClass('assinatural3-anima', delay);
				$s('.' + getOrientacao() + ' .assinatural5').addClass('assinatural5-anima', delay);

				$s('.' + getOrientacao() + ' .assinatural2').addClass('assinatural2-anima', delay);
				$s('.' + getOrientacao() + ' .assinatural6').addClass('assinatural6-anima', delay);

				$s('.' + getOrientacao() + ' .assinatural1').addClass('assinatural1-anima', delay);
				$s('.' + getOrientacao() + ' .assinatural7').addClass('assinatural7-anima', delay);
				delay += 0.8;
				$s('.' + getOrientacao() + ' .clique-para-ver').addClass('opacity1', delay);

			} else {
				delay += 0.5;
				$s('.' + getOrientacao() + ' .meninos-inventam').addClass('opacity1', delay);
				delay += 0.5;
				$s('.' + getOrientacao() + ' .assinatura-latinhas').addClass('opacity1', delay);
				delay += 1;
				$s('.' + getOrientacao() + ' .assinatural3').addClass('assinatural3-anima', delay);
				$s('.' + getOrientacao() + ' .assinatural5').addClass('assinatural5-anima', delay);

				$s('.' + getOrientacao() + ' .assinatural2').addClass('assinatural2-anima', delay);
				$s('.' + getOrientacao() + ' .assinatural6').addClass('assinatural6-anima', delay);

				$s('.' + getOrientacao() + ' .assinatural1').addClass('assinatural1-anima', delay);
				$s('.' + getOrientacao() + ' .assinatural7').addClass('assinatural7-anima', delay);
				delay += 0.8;
				$s('.' + getOrientacao() + ' .clique-para-ver').addClass('opacity1', delay);
			}

			// Insere a clicktag:
			insereClicktag();

		};

		/**
		 * Método chamado por abreAssinatura que aplica a clicktag na assinatura.
		 */
		var insereClicktag = function () {
			$s('.' + getOrientacao() + ' .clicktag').on('touchstart', function () {
				window.open('http://www.schweppes.com.br', '_self');
			});
		};

		return {

			init: init,
			close: close,
			getOrientacao: getOrientacao,
			iniciaTimer: iniciaTimer,
			cancelaTimer: cancelaTimer

		};
		
	}(window.OgvAd));

	window.OgvAd = OgvAd || {};

	// Initialize application
	window.addEventListener('load', OgvAd.init, false);

}(window, undefined));
