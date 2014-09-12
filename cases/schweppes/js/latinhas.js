OgvAd.latinhas = (function () {
	'use strict';

	// TEMP:
	var datasArray = OgvAd.timeline.getdatasArray(),
		leftTituloLatinhasArray = OgvAd.timeline.getLeftTituloLatinhasArray(),
		imagemAtual = 0,
		animando = false,
		qtdAPassar = 0,
		contador = 0;
	// TEMP.

	/**
	 * Método chamado por touchMove e touchEnd que muda o título da latinha.
	 * @param  {Number} indexAnoMaisProximo Index do array do ano mais próximo.
	 */
	var mudaTitulo = function (indexAnoMaisProximo) {
		// console.log('mudaTitulo');

		// Obtem o ano no array de anos:
		var anoMaisProximo = datasArray[indexAnoMaisProximo];

		// Obtem o ano atual:
		var anoAtual = OgvAd.timeline.getAnoAtual();

		// Checa se não ocorreu mudança de ano:
		if (anoAtual === anoMaisProximo) {
			return;
		}

		// Substitui o título da latinha:
		$s('.' + OgvAd.getOrientacao() + ' .titulo-latinha').src = 'img/' + OgvAd.getOrientacao() + '/' + anoMaisProximo + '-titulo.png';

		// Checagem para corrigir o "left" das latinhas no portrait:
		if (OgvAd.getOrientacao() === 'portrait') {

			// Obtem a posição "left" do título das latinhas:
			var leftTituloLatinha = leftTituloLatinhasArray[indexAnoMaisProximo];

			$s('.' + OgvAd.getOrientacao() + ' .titulo-latinha').style.left = leftTituloLatinha + 'px';

		}

	};

	var anima = function (indexAnoMaisProximo) {
		// console.log('anima');

		// Obtem o ano no array de anos:
		var anoMaisProximo = datasArray[indexAnoMaisProximo];

		// Obtem o ano atual e o seu index:
		var anoAtual = OgvAd.timeline.getAnoAtual(),
			indexanoAtual = datasArray.indexOf(anoAtual);

		// Checa se não ocorreu mudança de data:
		if (anoAtual === anoMaisProximo) {
			return;
		}

		// Verifica a direção da animação:
		if (indexAnoMaisProximo > indexanoAtual) {

			qtdAPassar = indexAnoMaisProximo * 11;
			animaParaDireita();

		} else {

			qtdAPassar = indexAnoMaisProximo * 11;
			animaParaEsquerda();

		}
	};

	var animaParaDireita = function () {
		// console.log('animaParaDireita', qtdAPassar, contador);

		var teste = window.setInterval(function () {

			if (contador >= qtdAPassar) {
				animando = false;
				window.clearInterval(teste);
				return;
			}

			animando = true;

			try {
				$s('.' + OgvAd.getOrientacao() + ' .latinhas').children[imagemAtual-1].classList.add('none');
				$s('.' + OgvAd.getOrientacao() + ' .latinhas').children[imagemAtual].classList.remove('none');
			} catch(e){

			}

			contador += 1;
			imagemAtual += 1;

		}, 20);

	};

	var animaParaEsquerda = function () {
		// console.log('animaParaEsquerda', qtdAPassar, contador);

		var teste = window.setInterval(function () {

			if (contador <= qtdAPassar || contador <= 0) {
				animando = false;
				window.clearInterval(teste);
				return;
			}

			try {
				$s('.' + OgvAd.getOrientacao() + ' .latinhas').children[imagemAtual].classList.add('none');
				$s('.' + OgvAd.getOrientacao() + ' .latinhas').children[imagemAtual-1].classList.remove('none');
			} catch(e){

			}

			contador -= 1;
			imagemAtual -= 1;

		}, 20);

	};


	return {

		mudaTitulo: mudaTitulo,
		anima: anima

	};

}(window.OgvAd || {}));