(function(OgvAd) {
	'use strict';
	var Main = (function() {
		var portrait = document.querySelector('#portrait'),
			container = document.querySelector('.container'),
			spray = document.querySelector('.spray'),
			seq1 = document.querySelector('.sequencia1'),
			seq1Imagens = seq1.querySelectorAll('img'),
			seq1qtd = seq1Imagens.length,
			seq2 = document.querySelector('.sequencia2'),
			seq2Imagens = seq2.querySelectorAll('img'),
			seq2qtd = seq2Imagens.length,
			indice = 0,
			rodando = false,
			timerAssinatura = null;

		function init() {
			portrait.addEventListener('mousedown', touchStart, false);
			portrait.addEventListener('mouseup', touchEnd, false);
		}

		function touchStart(event) {
			event.preventDefault();

                  portrait.addEventListener('mousemove', touchMove, false);

			inicializaAnimacao();
			move(event.x, event.y + 300);
			chamaSequencia1();
			cancelaTimerAssinatura();
		}

		function touchMove(event) {
			event.preventDefault();

			move(event.x, event.y + 300);
		}

		function touchEnd(event) {
			event.preventDefault();

                  portrait.removeEventListener('mousemove', touchMove, false);

			interrompeAnimacoes();
			ligaTimerAssinatura();
		}

		function move(posX, posY) {
			var top = posY - 250,
				left = posX - 430;
			TweenLite.to(container, 0.5, {
				top: top + 'px',
				left: left + 'px'
			});
		}
		// Início:
		function inicializaAnimacao() {
			TweenLite.to(document.querySelector('.tampa'), 0.2, {
				opacity: 0
			});
			TweenLite.to(document.querySelector('.box'), 1, {
				opacity: 0
			});
			TweenLite.to(document.querySelector('.pack'), 0.5, {
				rotation: '-10degx'
			});
		}
		// Assinatura:
		function ligaTimerAssinatura() {
			if (typeof timerAssinatura === 'object' ){
				timerAssinatura = window.setTimeout(abreAssinatura, 1000);
			}
		}

		function cancelaTimerAssinatura() {
			clearTimeout(timerAssinatura);
			timerAssinatura = null;
		}

		function abreAssinatura() {
			removeEventos();
			document.querySelector('.pack').classList.add('opacity0');
			document.querySelector('.assinatura').classList.add('assinatura-sem-scale');
		}

		function removeEventos() {
			portrait.removeEventListener('touchstart', touchStart, false);
			portrait.removeEventListener('touchmove', touchMove, false);
			portrait.removeEventListener('touchend', touchEnd, false);
		}
		// Começa e termina as animações:
		function chamaSequencia1() {
			if (rodando === false) {
				spray.classList.remove('opacity0');
				loop('iniciaSeq1', 10, callbackSeq1);
			}
		}

		function chamaSequencia2() {
			if (rodando === false) {
				loop('iniciaSeq2', 10, callbackSeq2);
			}
		}

		function cancelaSequencia1() {
			cancelAnimationFrame(window.iniciaSeq1);
			indice = 0;
			rodando = false;
		}

		function cancelaSequencia2() {
			cancelAnimationFrame(window.iniciaSeq2);
			indice = 0;
		}

		function cancelaTudo() {
			cancelaSequencia1();
			cancelaSequencia2();
			resetaAnimacoes();
		}
		// Limpeza das animações:
		function interrompeAnimacoes() {
			spray.classList.add('opacity0');
			cancelaTudo();
		}

		function resetaAnimacoes() {
			for (var i = 1; seq1qtd > i; i += 1) {
				seq1Imagens[i].style.display = 'none';
			}
			for (var ii = 0; seq2qtd > ii; ii += 1) {
				seq2Imagens[ii].style.display = 'none';
			}
			rodando = false;
		}
		// Métodos chamados pelo requestAnimationFrame:
		function callbackSeq1() {
			if (indice > 0) {
				seq1Imagens[indice - 1].style.display = 'none';
			}
			seq1Imagens[indice].style.display = 'block';
			indice++;
			if (indice === seq1qtd) {
				cancelaSequencia1();
				chamaSequencia2();
			}
		}

		function callbackSeq2() {
			if(seq1Imagens[seq1qtd - 1].style.display != 'none'){
				seq1Imagens[seq1qtd - 1].style.display = 'none';
			}

			if(indice === seq2qtd){
				indice = 0;
			}

			if(indice === 0){
				seq2Imagens[seq2qtd - 1].style.display = 'none';
			}else{
				seq2Imagens[indice - 1].style.display = 'none';
			}

			seq2Imagens[indice].style.display = 'block';

			indice++;
		}
		// requestAnimationFrame:
		function loop(id, fps, callback) {
			var now;
			var then = Date.now();
			var interval = 1000 / fps;
			var delta;
			rodando = true;

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
