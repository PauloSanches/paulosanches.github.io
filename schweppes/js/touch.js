OgvAd.touch = (function (){
	'use strict';

	// Posição X do toque atualizado pelo touchMove:
	var posX = 0;

	var touchStart = function (evento) {
		// console.log('touchStart');
		evento.preventDefault();

		// Cancela timer:
		OgvAd.cancelaTimer();

	};

	var touchMove = function (evento) {
		// console.log('touchMove');

		// Posição X do toque:
		posX = evento.touches[0].pageX;

		// Checa se chegou nos limites da timeline:
		OgvAd.timeline.checaLimiteTimeline(posX);

		// Obtem o index do ano mais próximo:
		var indexAnoMaisProximo = OgvAd.timeline.checaAnoMaisProximo(posX);

		// Animação das latinhas girando:
		OgvAd.latinhas.anima(indexAnoMaisProximo);

		// Muda o título da latinha:
		OgvAd.latinhas.mudaTitulo(indexAnoMaisProximo);

		// Muda a cor do ano na timeline:
		OgvAd.timeline.mudaCorAno(indexAnoMaisProximo);

		// Checa se o usuário visualizou toda a timeline:
		OgvAd.timeline.checaSeViuTudo(indexAnoMaisProximo);

	};

	var touchEnd = function (evento) {
		// console.log('touchEnd');

		// Retoma timer:
		OgvAd.iniciaTimer();

		// Obtem o index do ano mais próximo:
		var indexAnoMaisProximo = OgvAd.timeline.checaAnoMaisProximo(posX);

		// Move automaticamente para o ano mais próximo:
		OgvAd.timeline.moveAutomaticamente(indexAnoMaisProximo);

	};

	return {

		touchStart: touchStart,
		touchMove: touchMove,
		touchEnd: touchEnd

	};

}(window.OgvAd || {}));