(function (OgvAd) {
	'use strict';
	var Main = (function() {

		var indice = 0,
			seq1Imagens = $s('.sequencia1').querySelectorAll('img'),
			seq1qtd = seq1Imagens.length,
			seq2Imagens = $s('.sequencia2').querySelectorAll('img'),
			seq2qtd = seq2Imagens.length;

		function init() {

			if ( !$u.isPortrait() ){
				exibeStep1();
			}

		}

		// Step 1:
		function exibeStep1 () {
			iniciaSequencia1();

			var delay = 0.8;
			$s('.step1-um-fio').addClass('show', delay);
			$s('.step1-danificado').addClass('show', delay);
			$s('.step1-esta-torre').addClass('show', delay);
			$s('.step1-cheia-buracos').addClass('show', delay);
		}

		function escondeStep1 () {
			$s('.step1').addClass('hide');

			exibeStep2();
		}
		// Step 1.

		// Step 2:
		function exibeStep2 () {
			$s('.step2').removeClass('none');
			$s('.step2').addClass('show', 1);

			$u.timer(iniciaSequencia2, 2);
		}

		function escondeStep2 () {
			$s('.step2').addClass('hide');
			$s('.sequencia1').addClass('hide');
			$s('.sequencia2').addClass('hide');

			exibeStep3();
		}
		// Step 2.

		// Step 3:
		function exibeStep3 () {
			$s('.step3').removeClass('none');
			$s('.step3').addClass('show', 1);

			$s('.botao-saiba-mais').addEventListener('touchstart', function(){
				window.open('http://www.youtube.com/watch?v=Ys1YAcLWD4c&list=UUNWifvx-E-Y7Nykr5feg-Vw');
			}, false);
		}
		// Step 3.

		// Sequências de imagens:
		function iniciaSequencia1 () {
			loop('iniciaSeq1', 24, callbackSeq1);
		}

		function callbackSeq1 () {
			if (indice > 0) {
				seq1Imagens[indice - 1].style.display = 'none';
			}
			seq1Imagens[indice].style.display = 'block';
			indice++;
			if (indice === seq1qtd) {
				cancelaSequencia1();
			}
		}

		function cancelaSequencia1 () {
			cancelAnimationFrame(window.iniciaSeq1);

			indice = 0;

			$u.timer(escondeStep1, 1.5);
		}


		function iniciaSequencia2 () {
			loop('iniciaSeq2', 30, callbackSeq2);
		}

		function callbackSeq2 () {
			if(seq1Imagens[seq1qtd - 1].style.display != 'none'){
				seq1Imagens[seq1qtd - 1].style.display = 'none';
			}

			if (indice > 0) {
				seq2Imagens[indice - 1].style.display = 'none';
			}
			seq2Imagens[indice].style.display = 'block';
			indice++;
			if (indice === seq2qtd) {
				cancelaSequencia2();
			}
		}

		function cancelaSequencia2  () {
			cancelAnimationFrame(window.iniciaSeq2);

			$u.timer(escondeStep2, 1.5);
		}
		// Sequências de imagens.

		// requestAnimationFrame:
		function loop(id, fps, callback) {
			var now;
			var then = Date.now();
			var interval = 1000 / fps;
			var delta;

			function draw() {
				window[id] = requestAnimationFrame(draw);
				now = Date.now();
				delta = now - then;
				if (delta > interval) {
					then = now - (delta % interval);
					callback(id);
				}
			}
			draw();
		}
		// requestAnimationFrame.

		return {
			init: init
		};

	}());
	OgvAd.Main = Main;
	window.addEventListener('load', OgvAd.Main.init);
}(window.OgvAd = window.OgvAd || {}));
