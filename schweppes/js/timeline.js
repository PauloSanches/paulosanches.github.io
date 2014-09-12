OgvAd.timeline = (function () {
	'use strict';

	/*
		Portrait:
		- Posição exata em pixels dos anos na timeline.
		- Diferença de 119px entre cada ano.
	 */
	var pixelsPortraitArray = [24, 143, 262, 381, 500, 619];

	/*
		Landscape:
		- Posição exata em pixels dos anos na timeline.
		- Diferença de 136px* entre cada ano.
	 */
	var pixelsLandscapeArray = [27, 163, 301, 437, 574, 711];

	// Array de datas.
	var datasArray = [1783, 1851, 1930, 1950, 1960, 1980];

	// Posição "left" dos títulos das latinhas:
	var leftTituloLatinhasArray = [302, 274, 303, 259, 267, 278];

	// Ano atual.
	// Por padrão começa com o primeiro ano do array de anos.
	var anoAtual = datasArray[0];

	// Indica se a timeline foi vista completamente.
	var viuTudo = false;

	// Variáveis que auxiliam as checagens de limite da timeline e do ano mais próximo.
	var leftContainer = $s('.' + OgvAd.getOrientacao() + ' .timeline-container').offsetLeft,
		widthContainer = $s('.' + OgvAd.getOrientacao() + ' .timeline-container').clientWidth,
		widthArraste = $s('.' + OgvAd.getOrientacao() + ' .arraste-aqui').clientWidth;

	/**
	 * Método que retorna um array com as posições em pixels dos anos na timeline.
	 * @return {Array}
	 */
	var getPixelsArray = function () {

		var orientacao = OgvAd.getOrientacao(),
			pixelsArray;

		if (orientacao === 'portrait'){
			pixelsArray = [0, 119, 238, 357, 476, 595];
		} else {
			pixelsArray = [0, 136, 274, 410, 548, 684];
		}

		return pixelsArray;

	};

	/**
	 * Método chamado pelo touchMove que checa se o "Arraste aqui" chegou nos limites da timeline.
	 * @param  {Number} posX Posição X do toque atualizado pelo touchMove.
	 */
	var checaLimiteTimeline = function (posX) {
		// console.log('checaLimiteTimeline');

		// Posição X dentro da timeline:
		var xNaTimeline = posX - leftContainer - (widthArraste / 2);

		// Checa se chegou no limite esquerdo:
		if (xNaTimeline <= 0) {
			$s('.' + OgvAd.getOrientacao() + ' .arraste-aqui').style.left = '0px';

		// Checa se chegou no limite direito:
		} else if (xNaTimeline >= widthContainer - widthArraste) {
			$s('.' + OgvAd.getOrientacao() + ' .arraste-aqui').style.left = widthContainer - widthArraste + 'px';

		// Caso contrário, movimenta para qualquer lado:
		} else {
			$s('.' + OgvAd.getOrientacao() + ' .arraste-aqui').style.left = xNaTimeline + 'px';
		}

	};

	/**
	 * Método chamado por touchMove e touchEnd que calcula o ano mais próximo do "Arraste aqui".
	 * @param  {Number} posX Posição X do toque atualizado pelo touchMove.
	 * @return {Number} Index do array do ano mais próximo.
	 */
	var checaAnoMaisProximo = function (posX) {
		// console.log('checaAnoMaisProximo');

		var xNaTimeline = posX - leftContainer - (widthArraste / 2), // Posição X dentro da timeline.
			qtdAnos = getPixelsArray().length, // Identifica quantos anos existem na timeline.
			arrayTemp = [], // Array temporária utilizada para armazenar as distâncias para cada ano da timeline.
			menorDistancia, // Armazena a distância da posição X para o ano mais próximo.
			indexMenorDistancia; // Index do array da menor distância encontrada (Usado posteriormente para capturar o ano).

		for (var i = 0, l = qtdAnos; i < l; i += 1){
			arrayTemp[i] = Math.abs(xNaTimeline - getPixelsArray()[i]);
		}

		menorDistancia = Math.min.apply(Math, arrayTemp);
		indexMenorDistancia = arrayTemp.indexOf(menorDistancia);

		return indexMenorDistancia;

	};

	/**
	 * Método chamado por touchMove e touchEnd que modifica a cor dos anos na timeline.
	 * @param  {Number} indexAnoMaisProximo Index do array do ano mais próximo.
	 */
	var mudaCorAno = function (indexAnoMaisProximo) {
		// console.log('mudaCorAno');

		// Obtem o ano no array de anos:
		var anoMaisProximo = datasArray[indexAnoMaisProximo];

		// Checa se não ocorreu mudança de ano:
		if (anoAtual === anoMaisProximo) {
			return;
		}

		// Torna o ano atual preto:
		var classAnoAnterior = '.' + OgvAd.getOrientacao() + ' .ano' + anoAtual,
			caminhoAnoAnterior = 'img/' + OgvAd.getOrientacao() + '/timeline-' + anoAtual + 'p.png';

		$s(classAnoAnterior).src = caminhoAnoAnterior;

		// Torna o novo ano vermelho:
		var classNovoAno = '.' + OgvAd.getOrientacao() + ' .ano' + anoMaisProximo,
			caminhoProximoAno = 'img/' + OgvAd.getOrientacao() + '/timeline-' + anoMaisProximo + 'v.png';

		$s(classNovoAno).src = caminhoProximoAno;

		// REMOVER DAQUI:
		// Atualiza o ano atual:
		anoAtual = anoMaisProximo;

	};

	/**
	 * Método chamado por touchEnd para puxar o "Arraste aqui" para o ano mais próximo.
	 * @param  {Number} indexAnoMaisProximo Index do array do ano mais próximo.
	 */
	var moveAutomaticamente = function (indexAnoMaisProximo) {
		// console.log('moveAutomaticamente');

		var posicaoDoAno = getPixelsArray()[indexAnoMaisProximo], // Localização do ano mais próximo na timeline.
			leftArraste = $s('.' + OgvAd.getOrientacao() + ' .arraste-aqui').offsetLeft, // Posição left do "Arraste aqui".
			diferencaPxls = posicaoDoAno - leftArraste; // Distância do ano mais próximo para o "Arraste aqui".

		// Move para o ano mais próximo com animação:
		$s('.' + OgvAd.getOrientacao() + ' .arraste-aqui').style.webkitTransition = 'all 0.5s ease-in-out';
		$s('.' + OgvAd.getOrientacao() + ' .arraste-aqui').style.left = leftArraste + diferencaPxls + 'px';

		// Remove o transition após a animação terminar:
		$u.timer(function () {
			$s('.' + OgvAd.getOrientacao() + ' .arraste-aqui').style.webkitTransition = 'all 0s ease-in-out';
		}, 0.5);

	};

	/**
	 * Método chamado pelo touchMove que checa se o usuário visualizou toda a timeline.
	 * @param  {Number} indexAnoMaisProximo Index do array do ano mais próximo.
	 */
	var checaSeViuTudo = function (indexAnoMaisProximo) {
		// console.log('checaSeViuTudo');

		var qtdAnos = datasArray.length; // Identifica quantos anos existem na timeline.

		if (indexAnoMaisProximo === qtdAnos - 1) {
			viuTudo = true;
		}

	};

	return {

		checaLimiteTimeline: checaLimiteTimeline,
		checaAnoMaisProximo: checaAnoMaisProximo,
		moveAutomaticamente: moveAutomaticamente,
		checaSeViuTudo: checaSeViuTudo,
		mudaCorAno: mudaCorAno,
		getAnoAtual: function () {
			return anoAtual;
		},
		getViuTudo: function () {
			return viuTudo;
		},
		getdatasArray: function () {
			return datasArray;
		},
		getLeftTituloLatinhasArray: function () {
			return leftTituloLatinhasArray;
		}

	};

}(window.OgvAd || {}));