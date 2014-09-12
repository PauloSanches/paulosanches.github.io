window.OgvAd.CAT = (function () {
	'use strict';

	var tl = new window.OgvAd.Timeline($s('.touch-area'), $s('.fatos'), 0.9),
		telaInicial = $s('.tela-inicial'),
		timeline = $s('.timeline');

	function init() {
		telaInicialSettings();
		timelineSettings();
		setasIndicativas();
		setasInterna();
	}

	function setasIndicativas() {

		var qtdImagens = 9,
			imagemAtual = 1,
			contador = 0;

		var animacaoInterval = window.setInterval(function () {

			if (contador < qtdImagens) {

				try {
					$s('#img' + (imagemAtual - 1)).addClass('none');
					$s('#img' + (imagemAtual)).removeClass('none');
				} catch(e){

				}

			} else {

				$s('#img' + (imagemAtual - 1)).addClass('none');
				$s('#img1').removeClass('none');

				contador = -1;
				imagemAtual = 0;

			}

			contador += 1;
			imagemAtual += 1;

		}, 90);

	};
	function setasInterna() {

		var qtdImagens = 9,
			imagemAtual = 1,
			contador = 0;

		var animacaoInterval = window.setInterval(function () {

			if (contador < qtdImagens) {

				try {
					$s('#imgi' + (imagemAtual - 1)).addClass('none');
					$s('#imgi' + (imagemAtual)).removeClass('none');
				} catch(e){

				}

			} else {

				$s('#imgi' + (imagemAtual - 1)).addClass('none');
				$s('#imgi1').removeClass('none');

				contador = -1;
				imagemAtual = 0;

			}

			contador += 1;
			imagemAtual += 1;

		}, 90);

	};

	function telaInicialSettings(){
		var hammer = new window.Hammer(telaInicial, {
			drag_min_distance: 0,
			prevent_default:true
		});

		hammer.on('dragleft', function(ev){
			var transform = "translate3d(" + -1024 + "px," + 0 + "px, 0)";
			telaInicial.style.transform = transform;
			telaInicial.style.webkitTransform = transform;
			telaInicial.style.transition = 'all 0.6s ease-in-out';
			telaInicial.style.webkitTransition = 'all 0.6s ease-in-out';
			enableTimeline();
		});

	}

	function timelineSettings() {
		tl.hammer.on('dragend', checkFirstSlide);
		tl.hammer.on('drag', check);
	}

	function checkFirstSlide() {
		if (tl.slideActual === 0) {
			showInfo();
		} else {
			hideInfo();
		}
	}

	function showInfo() {
		$s('.seja-qual-for').removeClass('opacity0');
		$s('.setas-interna').removeClass('opacity0');
	}

	function hideInfo() {
		$s('.seja-qual-for').addClass('opacity0');
		$s('.setas-interna').addClass('opacity0');
	}

	function check(ev) {
		if (tl && tl.slideActual >= tl.slides-1 && tl.direction === 'left') {
			disableTimeline();
			showTelaFinal();
		} else if (tl && tl.slideActual === 0 && tl.direction === 'right') {
			showTelaInicial();
			disableTimeline();
		}
	}

	function enableTimeline () {
		tl.setLock(false);
	}

	function disableTimeline () {
		tl.setLock(true);
	}

	function showTelaInicial() {
		var transform = "translate3d(" + 0 + "px," + 0 + "px, 0)";
		telaInicial.style.transform = transform;
		telaInicial.style.webkitTransform = transform;
		telaInicial.style.transition = 'all 0.6s ease-in-out';
		telaInicial.style.webkitTransition = 'all 0.6s ease-in-out';
	}

	function showTelaFinal() {

		var transform = "translate3d(" + -1024 + "px," + 0 + "px, 0)";
		timeline.style.transform = transform;
		timeline.style.webkitTransform = transform;
		timeline.style.transition = 'all 0.6s ease-in-out';
		timeline.style.webkitTransition = 'all 0.6s ease-in-out';

		ctaSettings();
	}

	function ctaSettings() {

		if (!document.getElementById('clicktag')) {
			createClicktag();

			var hammer = new window.Hammer($s('#clicktag'), {
				drag_min_distance: 0,
				prevent_default:true
			});

			hammer.on('tap', function(){
				window.open('http://brasil.cat.com/builtforit?utm_source=EdGloboTablet_PEGN&utm_medium=bn_AnuncioInterativo&utm_content=Timeline&utm_campaign=CAT_Ogilvy_2013', '_self');
			});

			hammer.on('dragright', function(ev){
				var transform = "translate3d(" + 0 + "px," + 0 + "px, 0)";
				timeline.style.transform = transform;
				timeline.style.webkitTransform = transform;
				timeline.style.transition = 'all 0.6s ease-in-out';
				timeline.style.webkitTransition = 'all 0.6s ease-in-out';
				enableTimeline();
			});
		}

	}

	function createClicktag() {
		var el = document.createElement('div');

		el.setAttribute('id', 'clicktag');
		el.style.position = 'absolute';
		el.style.width = (document.getElementById('ogvStage').clientWidth - 100) + 'px';
		el.style.height = (document.getElementById('ogvStage').clientHeight - 100) + 'px';
		// el.style.background = '#ff2';
		// el.style.opacity = 0.5;
		el.style.top = 50 + 'px';
		el.style.left = 50 + 'px';

		document.getElementById('ogvStage').appendChild(el);
	}

	return {
		init: init
	};

}(window.OgvAd = window.OgvAd || {}));
